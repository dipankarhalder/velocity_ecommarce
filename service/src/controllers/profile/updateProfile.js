/** Custom modules */
import { logger } from "../../core/logger.core.js";

/** Models */
import { User } from "../../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    /** User id from request */
    const userId = req.userId;
    const updates = req.body;

    /** update user in db */
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true },
    )
      .select("username firstName lastName email")
      .lean();

    if (!updatedUser) {
      res
        .status(404)
        .json({ message: "The user is not found." });
      return;
    }

    logger.info(
      `Profile updated successfully for userId: ${userId}`,
    );
    res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    logger.error(
      `Failed to update user information: ${err.message}`,
    );

    res.status(500).json({
      message:
        "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
