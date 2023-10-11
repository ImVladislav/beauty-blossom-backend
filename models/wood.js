const { Schema, model } = require('mongoose');
const Joi = require("joi");
const { handleMongooseError } = require('../helpers')

const statusList = ['на складі', 'в роботі']

const woodSchema = new Schema({
    diametr: {
        type: Number,
        required: true
    },
    length: {
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

woodSchema.post('save', handleMongooseError)
// якщо при спробы сейв сталась помилка виконай цю мідлвар


const addSchema = Joi.object({
    diametr: Joi.number().required(),
    length: Joi.number().required(),
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

const Wood = model("wood", woodSchema)

module.exports = {
    Wood,
    schemas,
}