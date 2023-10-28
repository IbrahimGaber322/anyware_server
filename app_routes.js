import express from 'express'; // Importing the Express framework
import * as indexRouter from './modules/index.router.js'; // Importing the router from index module

/**
 * Function to set up routes for different endpoints using Express app
 * @param {object} app - The Express application
 */
function appRoutes(app) {
  // Using express.json() to parse incoming JSON requests
  app.use(express.json());

  // Setting up routes for different functionalities
  app.use(process.env.CHANNEL + '/auth', indexRouter.authRouter); // Route for authentication
  app.use(process.env.CHANNEL + '/announcement', indexRouter.announcementRouter); // Route for announcements
  app.use(process.env.CHANNEL + '/due', indexRouter.dueRouter); // Route for due information
}

export default appRoutes; // Exporting the appRoutes function
