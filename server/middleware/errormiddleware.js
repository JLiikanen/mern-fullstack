function errorHandlerForApiGoals(err, req, res, next) {
    console.log("hello from the error handler!")
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}



export default errorHandlerForApiGoals;