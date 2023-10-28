// Importing necessary modules and configurations
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import runningCors from './services/cors.js';
import runningRateLimit from './services/rate_limit.js';
import appRoutes from './app_routes.js';
import connectDB from './DB/connect_db.js';
import swaggerDocs from './swagger/swagger.js';

// Retrieving the port from the environment variables
const port = process.env.PORT;

// Initializing the Express application
const app = express();

// Applying middleware functions
runningCors(app); // Setting up CORS
runningRateLimit(app); // Applying rate limiting
appRoutes(app); // Assigning application routes

// Retrieving the database URL from the environment variables
const DB = process.env.DB_URL;

// Connecting to the database using the obtained URL
connectDB(DB);

// Function to start the server and listen to the specified port
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log('Server is running at port:', port);

    /**
     * SWAGGER DOCS NOTES
     * Ensure unique endpoint names to prevent issues with Swagger conversion
     * E.g., 'add product' = '/add' and 'add comment' = '/add' should be modified to 'product/add' and 'comment/add' respectively.
     */
    
    // Dynamic import to convert Postman collection to Swagger documentation
    import('./swagger/postman_to_swagger.js');
    swaggerDocs(app, ['./swagger/swagger.yaml']);
  });

  return server; // Return the server instance
};

// Start the server by calling the startServer function with the specified port
startServer(port);
