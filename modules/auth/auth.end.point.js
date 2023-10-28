import { roles } from '../../middleware/auth.js'; // Importing role-based access control middleware

// Defines roles allowed for the logout endpoint
const endPoint = {
  logout: [roles.admin, roles.instructor, roles.student], // Endpoint configuration for logout - accessible to admin, instructors, and students
};

export default endPoint;
