/** Custom modules */
import { envConfig } from "../../config/dotenv.config.js";
import { logger } from "../../core/logger.core.js";

/** Models */
import { Token } from "../../models/token.model.js";

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      await Token.deleteOne({ token: refreshToken });
      logger.info("User refresh token deleted successfully.");
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: envConfig.NODE_ENV === "production",
      sameSite: "strict",
    });

    logger.info("User logged out successfully.");
    res.status(204).json({
      message: "User logged out successfully.",
    });
  } catch (err) {
    logger.error(`Logout failed: ${err.message}`);

    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
