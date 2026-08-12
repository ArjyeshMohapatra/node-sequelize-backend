const rateLimit = require('express-rate-limit');
const apiError = require('../utils/apiError');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per window
    standardHeaders: true, // Return rate limit info in standard `RateLimit-*` headers
    legacyHeaders: false, // Disable old `X-RateLimit-*` headers
    handler: (_req, _res, next) => {
      next(new ApiError(429, 'Too many login/register attempts, please try again after 15 minutes.'));
    },
  });
  
  module.exports = { authLimiter };