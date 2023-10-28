import { dueKeyPattern } from "../../utils/joi_key_pattern.js";
import { default as joi } from "joi";

// Validation schema for adding a 'due'
export const addDue = {
  body: joi.object().required().keys({
    dueType: dueKeyPattern.dueType.required(), // Validation for due type
    dueTitle: dueKeyPattern.dueTitle.required(), // Validation for due title
    courseName: dueKeyPattern.courseName.required(), // Validation for course name
    dueTopic: dueKeyPattern.dueTopic.required(), // Validation for due topic
    dueDate: dueKeyPattern.dueDate.required(), // Validation for due date
  }),
};

// Validation schema for retrieving a 'due' by its ID
export const getDueById = {
  params: joi.object().required().keys({
    id: dueKeyPattern.id.required(), // Validation for due ID
  }),
};

// Validation schema for updating a 'due' by its ID
export const updateDueById = {
  params: joi.object().required().keys({
    id: dueKeyPattern.id.required(), // Validation for due ID
  }),
  body: joi.object().required().keys({
    dueType: dueKeyPattern.dueType.required(), // Validation for due type
    dueTitle: dueKeyPattern.dueTitle.required(), // Validation for due title
    courseName: dueKeyPattern.courseName.required(), // Validation for course name
    dueTopic: dueKeyPattern.dueTopic.required(), // Validation for due topic
    dueDate: dueKeyPattern.dueDate.required(), // Validation for due date
  }),
};

// Validation schema for soft deleting a 'due' by its ID
export const softDeleteDueById = {
  params: joi.object().required().keys({
    id: dueKeyPattern.id.required(), // Validation for due ID
  }),
};

// Validation schema for deleting a 'due' by its ID
export const deleteDueById = {
  params: joi.object().required().keys({
    id: dueKeyPattern.id.required(), // Validation for due ID
  }),
};
