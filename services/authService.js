const bcrypt = require('bcryptjs');
const { User, UserAuthentication, sequelize } = require('../models');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwtHelper');

class AuthService {
    async register(userData) {
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (existingUser) {
            const error = new Error('Email already registered');
            error.statusCode = 400;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const { password, ...userFields } = userData;
        return await sequelize.transaction(async (t) => {
            const hashedPassword = await bcrypt.hash(password, salt);
      
            // 1. Create main User record
            const user = await User.create(userFields, { transaction: t });
      
            // 2. Create linked UserAuthentication record
            const authRecord = await UserAuthentication.create(
              {
                user_id: user.id,
                password: hashedPassword,
              },
              { transaction: t }
            );
      
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
      
            // 3. Save refresh token
            authRecord.refresh_token = hashedRefreshToken;
            await authRecord.save({ transaction: t });
      
            return { user, accessToken, refreshToken };
          });
    }

    async login(email, password) {
        const user = await User.findOne({
            where: { email },
            include: [
              {
                model: UserAuthentication,
                as: 'authentication', // Must match the alias defined in User.hasOne
              },
            ],
          });
      
          if (!user || !user.authentication) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
          }
    
        const isMatch = await bcrypt.compare(password, user.authentication.password);
        if (!isMatch) {
          const error = new Error('Invalid email or password');
          error.statusCode = 401;
          throw error;
        }
    
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const salt = bcrypt.genSalt(10);
        const hashedRefreshToken = bcrypt.hash(refreshToken, salt);
    
        user.authentication.refresh_token = hashedRefreshToken;
        await user.authentication.save();
    
        return { user, accessToken, refreshToken };
      }

    async logout(userId) {
        const authRecord = await UserAuthentication.findOne({ where: { user_id: userId } });
        if (authRecord) {
          authRecord.refresh_token = null;
          await authRecord.save();
        }
    }
    
    async deleteAccount(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        await user.destroy();
    }

    // Token Rotation / Cyclic Token Generation
    async rotateTokens(incomingRefreshToken) {
        let decoded;
        try {
            decoded = verifyRefreshToken(incomingRefreshToken);
        } catch (_err) {
            const error = new Error('Invalid or expired refresh token');
            error.statusCode = 403;
            throw error;
        }

        const authRecord = await UserAuthentication.findOne({ where: { user_id: decoded.id } });
        const isTokenValid = await bcrypt.compare(incomingRefreshToken, authRecord.refresh_token);
        if (!authRecord || authRecord.refresh_token !== incomingRefreshToken || !isTokenValid) {
          throw new ApiError(403, 'Invalid refresh token (Already used or revoked)');
        }

        const user = await User.findByPk(decoded.id);

        // Issue NEW pair of access & refresh tokens
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        const salt = bcrypt.genSalt(10);
        const newHashedRefreshToken = await bcrypt.hash(newRefreshToken, salt);

        // Overwrite old refresh token in database (Rotation)
        authRecord.refresh_token = newHashedRefreshToken;
        await authRecord.save();

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}

module.exports = new AuthService();