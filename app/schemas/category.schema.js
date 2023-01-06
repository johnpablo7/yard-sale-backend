const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string()
  .min(2)
  .max(30)
  .regex(/^\w+(?:\s+\w+)*$/)
  .messages({
    'string.pattern.base':
      'The category name accepts alphabetic characters, numbers and spaces',
  });

const getCategorySchema = Joi.object({
  id: id.required(),
});
const createCategorySchema = Joi.object({
  name: name.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
});

module.exports = {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
};
