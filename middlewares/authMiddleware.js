const { verifyAccessToken } = require('../utils/jwtHelper');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // Contains id and email
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired access token' });
  }
};

module.exports = authenticate;