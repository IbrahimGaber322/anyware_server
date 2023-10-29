import cors from 'cors';

/**
 * Configures Cross-Origin Resource Sharing (CORS) settings for the Express app.
 * @param {object} app - The Express app instance.
 */
function runningCors(app) {
  // Define CORS options
  const corsOptions = {
    origin: ['http://localhost:3000', process.env.FRONT_URL], // Allow requests from specified origin (e.g., a front-end web app)
    optionsSuccessStatus: 200, // For legacy browser support: sets the status code for preflight OPTIONS request
  };

  // Apply CORS middleware to the app with the specified options
  app.use(cors(corsOptions));
}

export default runningCors;
