const Joi = require("joi");

const sendSchema = Joi.object({
	event_name:       Joi.string().required(),
	event_time:       Joi.number().required(),
	event_id:         Joi.string().required(),
	event_source_url: Joi.string().uri().required(),
	user_data:        Joi.object().optional(),
});

const schemas = {
	sendSchema,
};

module.exports = {
	schemas,
};
