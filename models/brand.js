const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const brandSchema = new Schema(
  {
    name: String,
    logo: String,
    title: String,
    description: String,
  },
  { versionKey: false, timestamps: true }
);

brandSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  logo: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  logo: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
});

const schemas = { addSchema, updateSchema };
const Brand = model("brand", brandSchema);

module.exports = {
  Brand,
  schemas,
};
