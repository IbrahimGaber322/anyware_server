// Load environment variables from a custom file using dotenv
import * as dotenv from 'dotenv';

// Function to load custom environment configuration
const loadCustomEnvironment = () => {
  // Change the path to load the environment file
  dotenv.config({ path: process.cwd() + '/.env.local' });
};

// Call the function to load the custom environment configuration
loadCustomEnvironment();
