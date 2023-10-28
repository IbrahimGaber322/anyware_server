import express from 'express';
import validation from '../../middleware/validation.js'; // Custom validation middleware
import * as validators from './auth.validation.schema.js'; // Validation schemas for authentication
import { auth } from '../../middleware/auth.js'; // Authentication middleware
import endPoint from './auth.end.point.js'; // Endpoints configuration
import * as controller from './auth.controller.js'; // Controller handling authentication

const router = express.Router(); // Initializing Express router

// Route for user signup
router.post('/signup', validation(validators.signup), controller.signup);

// Route for user login
router.post('/login', validation(validators.login), controller.login);

// Route for user logout
router.post('/logout', auth(endPoint.logout), controller.logout);

export default router;
