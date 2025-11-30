/** Node modules */
const jwt = require('jsonwebtoken');

/** Custom modules */
const env = require('../config/env.config');

/** Generate the tokens */
const generateAccessToken = (userId, username) => {
  return jwt.sign({ userId, username }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY,
    subject: 'accessApi',
  });
};

const generateRefreshToken = (userId, username) => {
  return jwt.sign({ userId, username }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY,
    subject: 'refreshToken',
  });
};

/** Verify the tokens */
const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
