const logger = require('../utils/logger');

const errorHandler = (err, _req, res, _next) => {
    logger.error(err.stack || err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    if (err.name === 'ZodError') {
        statusCode = 400;
        message = err.issues
          ? err.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')
          : 'Validation failed';
    }
    
    // Handle Sequelize Unique Constraint Errors (e.g., duplicate email)
    if (err.name === 'SequelizeUniqueConstraintError') {   
        statusCode = 409;
        message = err.errors.map((e) => e.message).join(', ');
    }

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

module.exports = errorHandler;