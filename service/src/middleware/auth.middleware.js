const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const env = require('../config/env.config');
const logger = require('../utils/logger.utils');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.info('Access denied. No token provided.');
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: StatusCodes.UNAUTHORIZED,
        message: 'Access denied. No token provided.',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Invalid or expired token.');
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: 'Invalid or expired token.',
      error: error.message,
    });
  }
};

module.exports = verifyToken;
