const { Schema, model } = require('mongoose');
const Joi = require("joi");
const { handleMongooseError } = require('../helpers')

const statusList = ['на складі', 'в роботі']

const desksSchema = new Schema({
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
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
    checked: {
        type: Boolean,
        default: false
    },
    status: {
    type: String,
        enum: statusList,
        required: true
    },
        owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, { versionKey: false, timestamps: true })

desksSchema.post('save', handleMongooseError)
// якщо при спробы сейв сталась помилка виконай цю мідлвар


const addSchema = Joi.object({
    length: Joi.number().required(),
    width: Joi.number().required(),
    height: Joi.number().required(),
    name: Joi.string().required(),
    amount: Joi.number().required(),
    code: Joi.number().required(),
    checked: Joi.boolean().required(),
    status: Joi.string().valid(...statusList).required()

})

const updateChekedSchema = Joi.object({
    checked: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateChekedSchema,
}

const Desks = model("desks", desksSchema)

module.exports = {
    Desks,
    schemas,
}