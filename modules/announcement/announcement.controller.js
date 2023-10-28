import announcementModel from "../../DB/model/announcement.model.js"; // Importing the announcement model
import internalServerError from "../../utils/internal_server_error.js"; // Function to handle internal server errors

/**
 * Handles the addition of a new announcement.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const addAnnouncement = async (req, res) => {
  try {
    const { topic, desc } = req.body;

    const announcement = await announcementModel.create({
      announcementTopic: topic,
      announcementDescription: desc,
      instructor: req.user._id,
    });

    res
      .status(201)
      .json({ message: "Announcement created successfully", announcement }); // 201 Created
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Retrieves a specific announcement by its ID.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await announcementModel.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" }); // 404 Not Found
    }

    res
      .status(200)
      .json({ message: "Announcement retrieved successfully", announcement }); // 200 OK
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Retrieves all available announcements.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await announcementModel
      .find({ isDeleted: false })
      .populate({
        path: "instructor",
        select: "name -_id",
      });

    res.status(200).json({ data: announcements }); // 200 OK
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Updates a specific announcement by its ID.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const updateAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, desc } = req.body;
    const announcement = await announcementModel.findById(id);

    if (
      !announcement ||
      announcement.instructor != req.user.id ||
      announcement.isDeleted === true
    ) {
      return res.status(404).json({ message: "Announcement not found" }); // 404 Not Found
    }

    const updated = await announcementModel.findByIdAndUpdate(
      id,
      {
        announcementTopic: topic,
        announcementDescription: desc,
        $inc: { __v: 1 },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Announcement updated successfully", updated }); // 200 OK
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Soft deletes a specific announcement by its ID.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const softDeleteAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await announcementModel.findById(id);

    if (
      !announcement ||
      announcement.instructor != req.user.id ||
      announcement.isDeleted === true
    ) {
      return res.status(404).json({ message: "Announcement not found" }); // 404 Not Found
    }

    await announcementModel.findByIdAndUpdate(
      id,
      {
        deletedBy: req.user._id,
        isDeleted: true,
      },
      { new: true }
    );

    res.status(200).json({ message: "Announcement moved to trash" }); // 200 OK
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Deletes a specific announcement by its ID.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const deleteAnnouncementById = async (req, res) => {
  try {
    await announcementModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Announcement has been deleted" }); // 200 OK
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};
