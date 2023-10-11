const { Schema, model } = require('mongoose');
const Joi = require("joi");
const { handleMongooseError } = require('../helpers')

const statusList = ['на складі', 'в роботі']

const inProgressWoodSchema = new Schema({
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
        required: false
    },
        owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
               
        
}, { versionKey: false, timestamps: true })

inProgressWoodSchema.post('save', handleMongooseError)
// якщо при спробы сейв сталась помилка виконай цю мідлвар


const addSchema = Joi.object({
    length: Joi.number().required(),
    diametr: Joi.number().required(),
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

const inProgressWood = model("inProgressWood", inProgressWoodSchema)

module.exports = {
    inProgressWood,
    schemas,
}