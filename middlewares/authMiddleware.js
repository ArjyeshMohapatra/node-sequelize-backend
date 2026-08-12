const { verifyAccessToken } = require('../utils/jwtHelper');
const ApiError = require('../utils/apiError');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Unauthorized: Missing token'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // Contains id and email
    next();
  } catch (_error) {
    return next(new ApiError(401, 'Unauthorized: Invalid or expired access token'));
  }
};

module.exports = authenticate;