const Joi = require('joi');

const id = Joi.string().uuid();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
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

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
  firstName: firstName.required(),
  lastName: lastName.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

module.exports = {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
};
