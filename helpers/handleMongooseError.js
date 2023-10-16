const handleMongooseError = (error, data, next) => {
    const {firstName, code} = error;
    const status = (firstName === "MongoServerError" && code === 11000) ? 409 : 400;
    error.status = status;
    next()
};

module.exports = handleMongooseError;