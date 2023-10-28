import { default as joi } from 'joi'; // Importing Joi for schema validation

// Schema for user-related data
export const userKeyPattern = {
  name: joi.string().pattern(new RegExp('^[a-zA-Z]+$')).messages({
    'string.pattern.base': 'The name should be in English alphabet',
  }),
  userName: joi.string().pattern(new RegExp('^@[a-zA-Z0-9]{3,14}$')).messages({
    'string.pattern.base': 'Username is not valid',
  }),
  password: joi
    .string()
    .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?_!@.$%^&*-]).{8,}$'))
    .messages({
      'string.pattern.base':
        'Password should be at least 8 characters long with one lowercase letter, one uppercase letter, one number, and one special character',
    }),
  cPassword: ref =>
    joi.string().valid(joi.ref(ref)).messages({
      'any.only': `Password and Confirm Password must match`,
      'string.empty': 'Confirm Password must not be empty',
    }),
  id: joi.string().min(24).max(24),
  token: joi.string(),
  role: joi.valid('admin', 'instructor', 'student'), // Valid roles for users
};

// Schema for announcement-related data
export const announcementKeyPattern = {
  id: joi.string().min(24).max(24),
  announcementTopic: joi.string(),
  announcementDescription: joi.string(),
};

// Schema for due-related data
export const dueKeyPattern = {
  id: joi.string().min(24).max(24),
  dueType: joi.valid('quiz', 'assignment'), // Valid due types
  dueTitle: joi.string(),
  courseName: joi.string(),
  dueTopic: joi.string(),
  dueDate: joi.string(), // For demonstration purposes (an actual date validation can be used instead)
  // dueDate: joi.date(), // Can use joi.date() for validating actual dates
};
