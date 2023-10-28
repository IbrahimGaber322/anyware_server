import mongoose from "mongoose"; // MongoDB object modeling tool

// Define the structure and constraints for the User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User's name
    userName: { type: String, required: true }, // Unique username
    password: { type: String, required: true }, // Password (hashed/salted)
    isLoggedIn: { type: Boolean, default: false }, // Indicates if the user is currently logged in
    role: {
      type: String,
      enum: ["admin", "instructor", "student"], // Role of the user: admin, instructor, or student
      default: "instructor", // Default role if not specified
    },
    LoggedInAt: Date, // Timestamp for when the user logged in
    LoggedOutAt: Date, // Timestamp for when the user logged out
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the User model using the defined schema
const userModel = mongoose.model("User", userSchema);

export default userModel;
