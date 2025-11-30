/** Custom modules */
import { logger } from "../../core/logger.core.js";

/** Models */
import { User } from "../../models/user.model.js";

export const details = async (req, res) => {
  try {
    /** User id from request */
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        message:
          "Unauthorized: User ID missing from request.",
      });
      return;
    }

    /** find user from db */
    const user = await User.findById(userId)
      .select(
        "username firstName lastName email profileImage",
      )
      .lean();

    if (!user) {
      res.status(404).json({
        message: "User account could not be found.",
      });
      return;
    }

    logger.info("User profile fetched successfully.");
    res.status(200).json({
      user,
      message: "User profile fetched successfully.",
    });
  } catch (err) {
    logger.error(`Loading profile failed: ${err.message}`);

    res.status(500).json({
      message:
        "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
