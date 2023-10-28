import { userKeyPattern } from '../../utils/joi_key_pattern.js'; // Importing user key patterns for validation
import { default as joi } from 'joi'; // Importing Joi for validation

/**
 * Validation schema for user login.
 */
export const login = {
  body: joi.object().required().keys({
    userName: userKeyPattern.userName.required(), // Validation for username
    password: userKeyPattern.password.required(), // Validation for password
  }),
};

/**
 * Validation schema for user signup.
 */
export const signup = {
  body: joi
    .object()
    .required()
    .keys({
      name: userKeyPattern.name.required(), // Validation for user's name
      userName: userKeyPattern.userName.required(), // Validation for username
      password: userKeyPattern.password.required(), // Validation for password
      cPassword: userKeyPattern.cPassword('password').required(), // Validation for confirming password
    }),
};
