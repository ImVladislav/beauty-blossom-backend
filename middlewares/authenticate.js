const jwt = require("jsonwebtoken");

const {User} = require("../models/user");

const {HttpError} = require("../helpers");

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    // якщо токен не прийшов то бек ламається залишаємо =""
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") {
        next(HttpError(401));
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token || user.token !== token) {
            next(HttpError(401)); 
        }
        req.user = user;
        // записує людину по айді яка добавляє товар
        next();
    }
    catch {
        next(HttpError(401));
    }
}

module.exports = authenticate;