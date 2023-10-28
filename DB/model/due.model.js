import mongoose from "mongoose"; // MongoDB object modeling tool

// Define the schema for Due, representing assignments or quizzes
const dueSchema = new mongoose.Schema(
  {
    dueType: {
      type: String,
      enum: ["quiz", "assignment"], // Type of the due, either a quiz or an assignment
      required: true,
    },
    dueTitle: { type: String, required: true }, // Title of the due task
    courseName: { type: String, required: true }, // Course associated with the due
    dueTopic: { type: String, required: true }, // Topic or subject of the due
    dueDate: { type: String, required: true }, // Due date (can be stored as a string)
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model as the instructor
      required: true,
    },
    isDeleted: { type: Boolean, default: false }, // Indicates if the due is marked as deleted
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model as the user who deleted the due
    },
    deletedAt: Date, // Timestamp for when the due was deleted
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the Due model using the defined schema
const dueModel = mongoose.model("Due", dueSchema);

export default dueModel;
