const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailSchema = new Schema(
  {
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    attachments: [
      {
        filename: String, // назва файлу
        content: Buffer, // дані файлу
        encoding: String, // кодування
        cid: String, // ідентифікатор контенту для вставки у тіло повідомлення
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

emailSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  to: Joi.string().required(),
  subject: Joi.string().required(),
  text: Joi.string(),
  html: Joi.string(),
  attachments: Joi.array().items(
    Joi.object({
      filename: Joi.string(),
      content: Joi.binary(),
      encoding: Joi.string(),
      cid: Joi.string(),
    })
  ),
  // attachments: Joi.array().items(
  //   Joi.object({
  //     filename: Joi.string().required(),
  //     content: Joi.binary().required(),
  //     encoding: Joi.string().required(),
  //     cid: Joi.string().required(),
  //   })
  // ),
});
// const Email = mongoose.model("Email", emailSchema);
const schemas = {
  addSchema,
};
const Email = model("email", emailSchema);

module.exports = {
  Email,
  schemas,
};
