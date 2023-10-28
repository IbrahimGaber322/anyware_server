import mongoose from "mongoose"; // MongoDB object modeling tool

// Define the schema for Announcements
const announcementSchema = new mongoose.Schema(
  {
    announcementTopic: { type: String, required: true }, // Title or topic of the announcement
    announcementDescription: { type: String, required: true }, // Description or content of the announcement
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model as the instructor
      required: true,
    },
    isDeleted: { type: Boolean, default: false }, // Indicates if the announcement is marked as deleted
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model as the user who deleted the announcement
    },
    deletedAt: Date, // Timestamp for when the announcement was deleted
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the Announcement model using the defined schema
const announcementModel = mongoose.model("Announcement", announcementSchema);

export default announcementModel;
