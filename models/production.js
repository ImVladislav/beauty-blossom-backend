const { Schema, model } = require('mongoose');
const Joi = require("joi");
const { handleMongooseError } = require('../helpers')

const productionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
        owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, { versionKey: false, timestamps: true })

productionSchema.post('save', handleMongooseError)
// якщо при спробы сейв сталась помилка виконай цю мідлвар


const addSchema = Joi.object({
    name: Joi.string().required(),
    amount: Joi.number().required(),
    code: Joi.number().required(),
})

const updateChekedSchema = Joi.object({
    checked: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateChekedSchema,
}

const Production = model("production", productionSchema)

module.exports = {
    Production,
    schemas,
}