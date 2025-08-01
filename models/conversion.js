const Joi = require("joi");

const customDataSchema = Joi.object({
	currency:     Joi.string().length(3).uppercase().optional(),
	value:        Joi.number().optional(),
	content_ids:  Joi.array().items(Joi.string()).optional(),
	content_name: Joi.string().optional(),
	content_type: Joi.string().optional(),
});

const sendSchema = Joi.object({
	event_name:       Joi.string().required(),
	event_time:       Joi.number().required(),
	event_id:         Joi.string().required(),
	event_source_url: Joi.string().uri().required(),
	user_data:        Joi.object().optional(),
	// eslint-disable-next-line no-use-before-define
	custom_data:      customDataSchema.optional(),
});

const schemas = {
	sendSchema,
};

module.exports = {
	schemas,
};
