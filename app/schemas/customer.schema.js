const Joi = require('joi');

const id = Joi.number().integer();
const phone = Joi.string();
const firstName = Joi.string()
  .min(2)
  .max(30)
  .regex(/^\w+(?:\s+\w+)*$/)
  .messages({
    'string.pattern.base':
      'First Name accepts alphabetic characters, numbers and spaces',
  });
const lastName = Joi.string()
  .min(2)
  .max(30)
  .regex(/^\w+(?:\s+\w+)*$/)
  .messages({
    'string.pattern.base':
      'Last Name accepts alphabetic characters, numbers and spaces',
  });
const userId = Joi.number().integer();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required(),
});

const updateCustomerSchema = Joi.object({
  firstName,
  lastName,
  phone,
  userId,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
  userId,
};
