const {HttpError} = require("../helpers");

const joiOptions = {
	allowUnknown: true,
};

const validateBody = schema => {
	const func = (req, res, next) => {
		const {error} = schema.validate(req.body, joiOptions);
		if (error) {
			return next(HttpError(400, error.message));
		}
		next()
	}

	return func;
}

module.exports = validateBody;