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
const description = Joi.string().min(10);
const categoryId = Joi.number().integer();
const price = Joi.number().integer().min(10);

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

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
  price_min,
  price_max: price_max.greater(Joi.ref('price_min')),
  // price_max: price_max.when('price_min', {
  //   is: Joi.number().integer(),
  //   then: Joi.required(),
  // }),
})
  .with('price_min', 'price_max')
  .with('price_max', 'price_min');

module.exports = {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  queryProductSchema,
};
