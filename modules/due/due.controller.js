import dueModel from "../../DB/model/due.model.js"; // Importing the due model
import internalServerError from "../../utils/internal_server_error.js"; // Utility function for handling internal server errors

/**
 * Handles the addition of a new 'due'.
 * @param {Request} req - Express request object containing new 'due' details
 * @param {Response} res - Express response object to send a response
 */
export const addDue = async (req, res) => {
  try {
    const { dueType, dueTitle, courseName, dueTopic, dueDate } = req.body;

    // Creating a new 'due' using the dueModel
    const due = await dueModel.create({
      dueType,
      dueTitle,
      courseName,
      dueTopic,
      dueDate,
      instructor: req.user._id, // Assigning the current user as the instructor
    });

    res.status(201).json({ message: "Due added successfully", due }); // 201 Created
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Retrieves a specific 'due' by its ID.
 * @param {Request} req - Express request object containing the 'due' ID
 * @param {Response} res - Express response object to send a response
 */
export const getDueById = async (req, res) => {
  try {
    const due = await dueModel.findById(req.params.id);

    if (!due) {
      return res.status(404).json({ message: "Due not found" }); // 404 Not Found
    }

    res.status(200).json({ message: "Due retrieved successfully", due }); // 200 OK
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Retrieves all 'dues' that are not marked as deleted.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object to send a response
 */
export const getAllDues = async (req, res) => {
  try {
    const dues = await dueModel.find({ isDeleted: false }).populate({
      path: "instructor",
      select: "name -_id",
    });

    res.status(200).json({ data: dues }); // 200 OK
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Updates a 'due' by its ID.
 * @param {Request} req - Express request object containing the 'due' ID and updated details
 * @param {Response} res - Express response object to send a response
 */
export const updateDueById = async (req, res) => {
  try {
    const { id } = req.params;
    const { dueType, dueTitle, courseName, dueTopic, dueDate } = req.body;
    const due = await dueModel.findById(id);

    // Validation for 'due' existence, ownership, and deletion status
    if (!due || due.instructor != req.user.id || due.isDeleted === true) {
      return res.status(404).json({ message: "Due not found" }); // 404 Not Found
    }

    // Update the 'due' and increment the version
    const updated = await dueModel.findByIdAndUpdate(
      id,
      {
        dueType,
        dueTitle,
        courseName,
        dueTopic,
        dueDate,
        $inc: { __v: 1 }, // Incrementing the version for change tracking
      },
      { new: true }
    );

    res.status(200).json({ message: "Due updated successfully", updated }); // 200 OK
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Soft deletes a 'due' by its ID.
 * @param {Request} req - Express request object containing the 'due' ID
 * @param {Response} res - Express response object to send a response
 */
export const softDeleteDueById = async (req, res) => {
  try {
    const { id } = req.params;
    const due = await dueModel.findById(id);

    // Validation for 'due' existence, ownership, and deletion status
    if (!due || due.instructor != req.user.id || due.isDeleted === true) {
      return res.status(404).json({ message: "Due not found" }); // 404 Not Found
    }

    // Soft delete the 'due' by setting the isDeleted flag and noting the deleter
    await dueModel.findByIdAndUpdate(
      id,
      {
        deletedBy: req.user._id, // Marking the user who triggered the delete
        isDeleted: true, // Setting the isDeleted flag to true
      },
      { new: true }
    );

    res.status(200).json({ message: "Due moved to trash successfully" }); // 200 OK
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Deletes a 'due' by its ID.
 * @param {Request} req - Express request object containing the 'due' ID
 * @param {Response} res - Express response object to send a response
 */
export const deleteDueById = async (req, res) => {
  try {
    await dueModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Due has been deleted" }); // 200 OK
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};
