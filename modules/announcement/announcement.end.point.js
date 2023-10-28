import { roles } from "../../middleware/auth.js"; // Importing role-based access control middleware

// Defines roles allowed for different announcement endpoints
const endPoint = {
  addAnnouncement: [roles.instructor], // Endpoint for adding an announcement, accessible to instructors
  getAnnouncementById: [roles.admin, roles.instructor, roles.student], // Endpoint to get a specific announcement by ID, accessible to admin, instructors, and students
  getAllAnnouncements: [roles.admin, roles.instructor, roles.student], // Endpoint to get all announcements, accessible to admin, instructors, and students
  updateAnnouncementById: [roles.instructor], // Endpoint to update an announcement by ID, accessible to instructors
  softDeleteAnnouncementById: [roles.admin, roles.instructor], // Endpoint to soft delete an announcement by ID, accessible to admin and instructors
  deleteAnnouncementById: [roles.admin, roles.instructor], // Endpoint to delete an announcement by ID, accessible to admin and instructors
};

export default endPoint;
