/** Node modules */
import { StatusCodes } from "http-status-codes";

/** Custom modules */
import { logger } from "../core/logger.core.js";

/** show the error if the route is not found */
export const missingRoutes = (req, res, next) => {
  const error = new Error("The API url not found.");
  error.status = StatusCodes.NOT_FOUND;
  logger.error(`The API url not found.`);
  next(error);
};

/** manage error globally */
export const globalError = (res, error) => {
  logger.error(`Server error: ${error.message}.`);
  res.status(
    error.status || StatusCodes.INTERNAL_SERVER_ERROR,
  );
  res.json({
    error: { message: error.message },
  });
};

export const sendErrorResponse = (res, error) => {
  logger.error(
    "Something went wrong, please try again later.",
  );
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message:
        "Something went wrong, please try again later.",
      error: error.message,
    });
};

export const validateFields = (res, messages) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    status: StatusCodes.BAD_REQUEST,
    message: messages,
  });
};

export const notFoundItem = (res, messages) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    status: StatusCodes.NOT_FOUND,
    message: messages,
  });
};
