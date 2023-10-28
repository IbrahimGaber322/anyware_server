import mongoose from "mongoose"; // MongoDB object modeling tool

/**
 * Establishes a connection to the MongoDB database.
 * @param {string} uri - Database connection URI
 */
const connectDB = async (uri) => {
  try {
    // Allow usage of MongoDB's non-strict mode
    mongoose.set("strictQuery", false);

    // Connect to the MongoDB database using the provided URI and database name from the environment variables
    await mongoose.connect(uri, { dbName: process.env.DB_NAME });

    // Log a successful connection message
    console.log(`Connected to MongoDB at ${uri}`);
  } catch (err) {
    console.log(err); // Log any errors occurred during the connection process
  }
};

export default connectDB;
