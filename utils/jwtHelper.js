const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, ACCESS_SECRET, { expiresIn: '20m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email}, REFRESH_SECRET, { expiresIn: '7d' });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_SECRET);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};