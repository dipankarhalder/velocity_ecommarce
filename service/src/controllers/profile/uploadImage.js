/** Custom modules */
import { logger } from "../../core/logger.core.js";
import {
  saveUploadedFile,
  markPreviousImagesUnused,
} from "../../core/filehelper.core.js";

/** Models */
import { User } from "../../models/user.model.js";

export const uploadImage = async (req, res) => {
  try {
    const userId = req.userId?.toString();

    /** Ensure file was uploaded */
    if (!req.file) {
      res.status(400).json({
        message:
          "No file uploaded. Please attach an image.",
      });
      return;
    }

    /** validate the user id exist */
    if (!userId) {
      res.status(400).json({
        message: "User ID is missing",
      });
      return;
    }

    /** Save file info to DB */
    const uploadedFile = await saveUploadedFile(
      req.file,
      "user",
      userId,
    );

    /** Mark file as used */
    await markPreviousImagesUnused(
      "user",
      userId,
      uploadedFile._id,
    );

    /** Update user's profile image */
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { profileImage: uploadedFile.path },
      { new: true },
    )
      .select(
        "username firstName lastName email profileImage",
      )
      .lean();

    logger.info(
      `Profile image uploaded for user ${req.userId}: ${req.file.filename}`,
    );
    res.status(200).json({
      message: "Profile image uploaded successfully",
      user: updatedUser,
      file: uploadedFile,
    });
  } catch (err) {
    logger.error(
      `Failed to upload profile image: ${err.message}`,
    );

    res.status(500).json({
      message:
        "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
