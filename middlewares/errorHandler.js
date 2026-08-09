const errorHandler = (err, _req, res, _next) => {
    console.error('Error Stack:', err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

module.exports = errorHandler;