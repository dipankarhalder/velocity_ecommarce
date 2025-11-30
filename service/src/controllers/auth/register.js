/** Custom modules */
import { envConfig } from "../../config/dotenv.config.js";
import { logger } from "../../core/logger.core.js";
import {
  genUsername,
  genDeviceInfo,
} from "../../utils/user.utils.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.utils.js";

/** Models */
import { User } from "../../models/user.model.js";
import { Token } from "../../models/token.model.js";
import { Device } from "../../models/device.model.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } =
      req.body;

    /** Check for existing email */
    const existEmail = await User.exists({ email });
    if (existEmail) {
      res.status(400).json({
        message: `Provided ${email} is already associated with another user.`,
      });
      return;
    }

    /** Create new user */
    const username = genUsername();
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      email,
      password,
    });

    /** Generate access and refresh token for new user */
    const accessToken = generateAccessToken(
      newUser._id,
      newUser.username,
    );
    const refreshToken = generateRefreshToken(
      newUser._id,
      newUser.username,
    );

    /** Store the refresh token in database */
    await Token.create({
      token: refreshToken,
      userId: newUser._id,
    });
    logger.info("Refresh token created successfully.");

    /** Initialized and store the device information in database */
    const deviceInfo = genDeviceInfo(req, "register");
    await Device.create({
      ...deviceInfo,
      userId: newUser._id,
    });
    logger.info("Device information stored successfully.");

    /** set refresh token in cookies */
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: envConfig.NODE_ENV === "production",
      sameSite: "strict",
    });

    logger.info(
      `User registered successfully: ${newUser.email}`,
    );
    res.status(201).json({
      user: {
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      accessToken,
      message: "User registered successfully.",
    });
  } catch (err) {
    const errorMessage = err?.message || String(err);
    logger.error(`Registration error: ${errorMessage}`);

    res.status(500).json({
      message:
        "Oops! Something went wrong. Please try again.",
      error: errorMessage,
    });
  }
};
