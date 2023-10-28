import { roles } from '../../middleware/auth.js'; // Importing role-based access control middleware

// Endpoints configuration specifying required roles for access
const endPoint = {
  addDue: [roles.instructor], // Endpoint to add a due: accessible only to instructors
  getDueById: [roles.admin, roles.instructor, roles.student], // Endpoint to get a due by ID: accessible to admin, instructors, and students
  getAllDues: [roles.admin, roles.instructor, roles.student], // Endpoint to get all dues: accessible to admin, instructors, and students
  updateDueById: [roles.instructor], // Endpoint to update a due by ID: accessible only to instructors
  softDeleteDueById: [roles.admin, roles.instructor], // Endpoint to soft delete a due by ID: accessible to admin and instructors
  deleteDueById: [roles.admin, roles.instructor], // Endpoint to delete a due by ID: accessible to admin and instructors
};

export default endPoint;
