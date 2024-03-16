const errorHandler = (err, req, res, next) => {
    // 1. Determine error type and status code
    let statusCode = err.status || 500; // Default to server error
    if (err.name === 'ValidationError') { // Mongoose validation error
        statusCode = 400;
    }

    // 2. Log the error (consider a dedicated logging library for production)
    console.error(err);

    // 3. Send a formatted error response
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;
