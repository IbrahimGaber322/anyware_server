import * as dotenv from 'dotenv';
dotenv.config();
import { default as jwt } from "jsonwebtoken"; // JSON Web Token library
import userModel from "../DB/model/user.model.js"; // User model for database interaction
import internalServerError from "../utils/internal_server_error.js"; // Function to handle internal server errors

/**
 * Object defining roles for different user types.
 */
export const roles = {
  admin: "admin",
  instructor: "instructor",
  student: "student",
};

/**
 * Middleware for authentication based on access roles.
 * @param {Array} accessRoles - Array of roles permitted to access a route
 * @returns {Function} Middleware function for user authentication
 */
export const auth = (accessRoles) => {
  return async (req, res, next) => {
    try {
      const headerToken = req.headers["authorization"];

      // Check if the token exists and has the correct format
      if (
        !headerToken ||
        headerToken === null ||
        headerToken === undefined ||
        !headerToken.startsWith(process.env.BEARER_SECRET + " ")
      ) {
        return res.status(401).json({
          message: "Invalid header token",
        }); // 401 Unauthorized
      }

      const token = headerToken.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Check if the token is valid and signed in
      if (!decoded.isSignedIn) {
        return res.status(401).json({
          message: "Invalid token",
        }); // 401 Unauthorized
      }

      // Find the user based on the decoded token ID
      const foundUser = await userModel.findById(decoded.id);

      // Check if the user exists
      if (!foundUser) {
        return res.status(401).json({
          message: "User not found",
        }); // 401 Unauthorized
      }

      // Check if the user has access based on roles
      if (!accessRoles.includes(foundUser.role)) {
        return res.status(401).json({
          message: "User not authorized",
        }); // 401 Unauthorized
      }

      // Add user to req object for further usage in routes
      req.user = foundUser;
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      internalServerError(res, error); // Handling internal server error
    }
  };
};
