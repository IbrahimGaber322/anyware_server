import express from "express";
import validation from "../../middleware/validation.js"; // Custom validation middleware
import * as validators from "./due.validation.schema.js"; // Validation schemas for 'due'
import { auth } from "../../middleware/auth.js"; // Authentication middleware
import endPoint from "./due.end.point.js"; // Endpoints configuration
import * as controller from "./due.controller.js"; // Controller handling 'due' operations

const router = express.Router(); // Initializing Express router

// Route for adding a 'due'
router.post(
  "/add",
  validation(validators.addDue),
  auth(endPoint.addDue),
  controller.addDue
);

// Route for getting a specific 'due' by ID
router.get(
  "/:id",
  validation(validators.getDueById),
  auth(endPoint.getDueById),
  controller.getDueById
);

// Route for getting all 'dues'
router.get("/", auth(endPoint.getAllDues), controller.getAllDues);

// Route for updating a 'due' by ID
router.patch(
  "/:id/update",
  validation(validators.updateDueById),
  auth(endPoint.updateDueById),
  controller.updateDueById
);

// Route for soft deleting a 'due' by ID
router.patch(
  "/:id/soft-delete",
  validation(validators.softDeleteDueById),
  auth(endPoint.softDeleteDueById),
  controller.softDeleteDueById
);

// Route for deleting a 'due' by ID
router.delete(
  "/:id/delete",
  validation(validators.deleteDueById),
  auth(endPoint.deleteDueById),
  controller.deleteDueById
);

export default router;
