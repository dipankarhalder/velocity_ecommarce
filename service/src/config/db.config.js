/** Node modules */
const mongoose = require('mongoose');

/** Custom modules */
const logger = require('../utils/logger.utils');
const { MONGO_URI } = require('./env.config');

/** Client options object */
const clientOptions = {
  dbName: 'velocity',
  appName: 'velocity ecommerce',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * If an error occurs during the connection process, it throws an error with a descriptive message.
 * - Uses 'MONGO_URI' as the connection string,
 * - 'clientOptions' contains additional configuration for MOngoose,
 * - Errors are properly handled and rethrown for better debugging,
 */
const connectToDatabase = async () => {
  if (!MONGO_URI) {
    throw new Error('MongoDB URI is not defined in the configuration.');
  }

  try {
    await mongoose.connect(MONGO_URI, clientOptions);
    logger.info('Connected to the database successfully.');
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    logger.error('Database failed to connect.', err);
  }
};

/**
 * Disconnects from the MongoDB database using Mongoose.
 * This funtion attempts to disconnect from the database asynchronously,
 * if the disconnection is successfully, a success message is logged,
 * If an error occurs, it is either re-thrown as a new Error (if it's an instance of Error) or logged to the console,
 */
const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    logger.info('Disconnected from the database successfully.');
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    logger.error('Error disconnecting from the database.');
  }
};

module.exports = { connectToDatabase, disconnectFromDatabase };
