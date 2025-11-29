/** Node modules */
const jwt = require('jsonwebtoken');

/** Custom modules */
const { config } = require('../config/env.config');

/** Generate the tokens */
const generateAccessToken = (userId, username) => {
  return jwt.sign({ userId, username }, config.JWT_ACCESS_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
    subject: 'accessApi',
  });
};

const generateRefreshToken = (userId, username) => {
  return jwt.sign({ userId, username }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
    subject: 'refreshToken',
  });
};

/** Verify the tokens */
const verifyAccessToken = (token) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
