/** Custom modules */
const { config } = require('../../config/env.config.js');
const { logger } = require('../../utils/logger.utils.js');
const { genUsername, genDeviceInfo } = require('../../utils/user.utils.js');
const { generateAccessToken, generateRefreshToken } = require('../../utils/token.utils.js');

/** Models */
const User = require('../../models/user.model.js');
const Token = require('../../models/token.model.js');
const Device = require('../../models/device.model.js');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password);

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

    console.log(username, newUser);

    /** Generate access and refresh token for new user */
    const accessToken = generateAccessToken(newUser._id, newUser.username);
    const refreshToken = generateRefreshToken(newUser._id, newUser.username);
    console.log('accessToken, refreshToken');
    console.log(accessToken, refreshToken);

    /** Store the refresh token in database */
    await Token.create({ token: refreshToken, userId: newUser._id });
    logger.info('Refresh token created successfully.');

    /** Initialized and store the device information in database */
    const deviceInfo = genDeviceInfo(req, 'register');
    await Device.create({ ...deviceInfo, userId: newUser._id });
    logger.info('Device information stored successfully.');

    /** set refresh token in cookies */
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    logger.info(`User registered successfully: ${newUser.email}`);
    console.log('sdfkhjskdfjsdhf');
    res.status(201).json({
      user: {
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      accessToken,
      message: 'User registered successfully.',
    });
  } catch (err) {
    logger.error(`Registration error: ${err.message}`);

    res.status(500).json({
      message: 'Oops! Something went wrong. Please try again.',
      error: err.message,
    });
  }
};

module.exports = register;
