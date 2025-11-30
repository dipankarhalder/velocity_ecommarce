/** Node modules */
import jwt from "jsonwebtoken";

/** Custom modules */
import { envConfig } from "../config/dotenv.config.js";

/** Generate the tokens */
export const generateAccessToken = (userId, username) => {
  return jwt.sign(
    { userId, username },
    envConfig.JWT_ACCESS_SECRET,
    {
      expiresIn: envConfig.ACCESS_TOKEN_EXPIRY,
      subject: "accessApi",
    },
  );
};

export const generateRefreshToken = (userId, username) => {
  return jwt.sign(
    { userId, username },
    envConfig.JWT_REFRESH_SECRET,
    {
      expiresIn: envConfig.REFRESH_TOKEN_EXPIRY,
      subject: "refreshToken",
    },
  );
};

/** Verify the tokens */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, envConfig.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, envConfig.JWT_REFRESH_SECRET);
};
