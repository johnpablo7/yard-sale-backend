const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string()
  .min(3)
  .max(30)
  .regex(/^\w+(?:\s+\w+)*$/)
  .messages({
    'string.pattern.base':
      'The product name accepts alphabetic characters, numbers and spaces',
  });
const image = Joi.string().uri();
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const getProductSchema = Joi.object({
  id: id.required(),
});

const createProductSchema = Joi.object({
  name: name.required(),
  image: image.required(),
  description: description.required(),
  price: price.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId,
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
});

module.exports = {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  queryProductSchema,
};
