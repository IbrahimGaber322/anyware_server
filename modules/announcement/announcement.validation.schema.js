import { announcementKeyPattern } from "../../utils/joi_key_pattern.js"; // Importing announcement key patterns for validation
import { default as joi } from "joi"; // Importing Joi for validation

/**
 * Validation schema for adding an announcement.
 */
export const addAnnouncement = {
  body: joi.object().required().keys({
    topic: announcementKeyPattern.announcementTopic.required(), // Validates the topic of the announcement
    desc: announcementKeyPattern.announcementDescription.required(), // Validates the description of the announcement
  }),
};

/**
 * Validation schema for getting an announcement by its ID.
 */
export const getAnnouncementById = {
  params: joi.object().required().keys({
    id: announcementKeyPattern.id.required(), // Validates the announcement ID in the parameters
  }),
};

/**
 * Validation schema for updating an announcement by its ID.
 */
export const updateAnnouncementById = {
  params: joi.object().required().keys({
    id: announcementKeyPattern.id.required(), // Validates the announcement ID in the parameters
  }),
  body: joi.object().required().keys({
    topic: announcementKeyPattern.announcementTopic.required(), // Validates the updated topic of the announcement
    desc: announcementKeyPattern.announcementDescription.required(), // Validates the updated description of the announcement
  }),
};

/**
 * Validation schema for soft deleting an announcement by its ID.
 */
export const softDeleteAnnouncementById = {
  params: joi.object().required().keys({
    id: announcementKeyPattern.id.required(), // Validates the announcement ID in the parameters
  }),
};

/**
 * Validation schema for deleting an announcement by its ID.
 */
export const deleteAnnouncementById = {
  params: joi.object().required().keys({
    id: announcementKeyPattern.id.required(), // Validates the announcement ID in the parameters
  }),
};
