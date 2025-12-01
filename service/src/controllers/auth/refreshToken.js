/** Custom modules */
import { logger } from "../../core/logger.core.js";
import { verifyRefreshToken, generateAccessToken } from "../../utils/token.utils.js";

/** Models */
import { Token } from "../../models/token.model.js";

export const refreshToken = async (req, res) => {
  const refresh_token = req.cookies.refreshToken;

  try {
    /** verify existing token */
    const tokenExist = await Token.exists({
      token: refresh_token,
    });
    if (!tokenExist) {
      res.status(401).json({
        message: "Invalid or expired refresh token. Please log in again.",
      });
      return;
    }

    /** verify refresh token and generate a new access token */
    const jwtPayload = verifyRefreshToken(refresh_token);
    const accessToken = generateAccessToken(jwtPayload.userId, jwtPayload.username);

    logger.info("Access token generated successfully.");
    res.status(200).json({
      accessToken,
      message: "Access token generated successfully.",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        message: "Your session has expired. Please sign in again to continue.",
      });
      return;
    }

    if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        message: "The provided token is invalid or has expired.",
      });
      return;
    }

    logger.error(`Failed to refresh token: ${error.message}`);
    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: error.message,
    });
  }
};
