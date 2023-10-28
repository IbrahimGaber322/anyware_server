import express from "express";
import validation from "../../middleware/validation.js"; // Custom validation middleware
import * as validators from "./announcement.validation.schema.js"; // Validation schemas for announcements
import { auth } from "../../middleware/auth.js"; // Authentication middleware
import endPoint from "./announcement.end.point.js"; // Endpoints configuration
import * as controller from "./announcement.controller.js"; // Controller handling announcements

const router = express.Router(); // Initializing Express router

// Route for adding an announcement
router.post(
  "/add",
  validation(validators.addAnnouncement),
  auth(endPoint.addAnnouncement),
  controller.addAnnouncement
);

// Route for getting a specific announcement by ID
router.get(
  "/:id",
  validation(validators.getAnnouncementById),
  auth(endPoint.getAnnouncementById),
  controller.getAnnouncementById
);

// Route for getting all announcements
router.get(
  "/",
  auth(endPoint.getAllAnnouncements),
  controller.getAllAnnouncements
);

// Route for updating an announcement by ID
router.patch(
  "/:id/update",
  validation(validators.updateAnnouncementById),
  auth(endPoint.updateAnnouncementById),
  controller.updateAnnouncementById
);

// Route for soft deleting an announcement by ID
router.patch(
  "/:id/soft-delete",
  validation(validators.softDeleteAnnouncementById),
  auth(endPoint.softDeleteAnnouncementById),
  controller.softDeleteAnnouncementById
);

// Route for deleting an announcement by ID
router.delete(
  "/:id/delete",
  validation(validators.deleteAnnouncementById),
  auth(endPoint.deleteAnnouncementById),
  controller.deleteAnnouncementById
);

export default router;
