/** Custom modules */
import { logger } from "../core/logger.core.js";
import { verifyAccessToken } from "../utils/token.utils.js";

/**
 * @function authenticate
 * @description Middleware to verify the user's access token from the Authorization header. If the token is valid, the user's ID is attached to the request object. Otherwise, it returns an appropriate error response.
 * @param {Request} req - Express request object. Expects a Bearer token in the Authorization header.
 * @param {Response} res - Express response object used to send error responses if authentication fails.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {void}
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  /** If there's no Bearer token, respond with 401 unauthorized */
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({
      message:
        "Access denied. Please provide a valid token to continue.",
    });
    return;
  }

  /** Split out the token from the 'Bearer' prefix */
  const [, token] = authHeader.split(" ");

  try {
    /** Verify the token and extract the userId from the payload */
    const jetPayload = verifyAccessToken(token);

    /** Attach the useId to the request object for later use */
    req.userId = jetPayload.userId;

    /** Proceed to the next middleware or route handler */
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        message:
          "Your session has expired. Please sign in again to continue.",
      });
      return;
    }

    if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        message:
          "The provided token is invalid or has expired.",
      });
      return;
    }

    logger.error("Failed to authenticate user.");
    res.status(500).json({
      message:
        "Oops! Something went wrong. Please try again.",
      error: error.message,
    });
  }
};
