const { Schema, model } = require('mongoose');
const Joi = require("joi");
const { handleMongooseError } = require('../helpers')


const ordersSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
        lastName: {
        type: String,
        required: true
    }, 
       number: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    warehouse: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    orderedItems: [
          {
          productId: {
            type: String,
            required: true
            },
             images: {
            type: String,
            required: true
          }, 
          code: {
            type: String,
            required: true
          },
          amount: {
            type: Number,
            required: true
          },
          name: {
            type: String,
           required: true
          },
          quantity: {
            type: Number,
              required: true     
          }
        },
    ],
}, { versionKey: false, timestamps: true })

ordersSchema.post('save', handleMongooseError)
// якщо при спробы сейв сталась помилка виконай цю мідлвар


const addSchema = Joi.object({
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    number: Joi.number().required(),
    city: Joi.string().required(),
    warehouse: Joi.string().required(),
    paymentMethod: Joi.string().required(),
    comments: Joi.string(),
    amount: Joi.number().required(),
        orderedItems: Joi.array().items(Joi.object({
        productId: Joi.number().required(),
        name: Joi.string().required(),
        quantity: Joi.number().required(),
        amount: Joi.number().required(),
        images: Joi.string().required(),
        code: Joi.string().required()
    })).required()

})


const updateChekedSchema = Joi.object({
    checked: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateChekedSchema,
}

const orders = model("orders", ordersSchema)

module.exports = {
    orders,
    schemas,
}