function errorHandlerForApiGoals(err, req, res, next) {
    console.log("hello from the error handler!")
    const statusCode = 500;

    // server logging
    console.log(err.message, statusCode)

    return res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
    
}



export default errorHandlerForApiGoals;