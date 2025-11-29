/** Node modules */
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');

/** Custom modules */
const router = require('./routes');
const env = require('./config/env.config');
const logger = require('./utils/logger.utils');
const ratelimiter = require('./config/rate.config');
const { globalError, missingRoutes } = require('./utils/core.utils');
const { connectToDatabase, disconnectFromDatabase } = require('./config/db.config');

/** Config CORS */
const corsOptions = {
  origin(origin, callback) {
    if (env.NODEENV === 'development' || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error: ${origin} is not allowed by CORS`), false);
      logger.warn(`CORS error: ${origin} is not allowed by CORS`);
    }
  },
};

/** Initial express app */
const app = express();

/** Middlewares */
app.use(cors(corsOptions)); /** CORS middleware */
app.use(express.json()); /** Enable JSON request body parsing */
app.use(express.urlencoded({ extended: true })); /** Request body parsing with extended mode */
app.use(cookieParser());
app.use(compression({ threshold: 1024 })); /** Enable response compression to reduce payload size and improve performance */
app.use(helmet()); /** enhance security by setting various HTTP headers */
app.use(ratelimiter);

/** Serve static uploads directory */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/**
 * IIFE: Immediately Invoked Async Function Expression to start the server.
 * - Tries to connect to the database before initializing the server,
 * - Defines the API routes ('/api/v1'),
 * - Starts the server on the specified PORT and logs the running URL,
 * - If an error occurs during startup, it is logged, and the process exits with status 1.
 */
(async () => {
  try {
    /** Initialized database */
    await connectToDatabase();

    /** Initialized root routes */
    app.use('/api', router);
    app.use((req, res, next) => missingRoutes(req, res, next));
    app.use((error, req, res) => globalError(res, error));

    /** Run the server */
    app.listen(env.PORT, () => {
      logger.info(`Server running: ${env.PORT}.`);
    });
  } catch (err) {
    logger.error('Failed to start the server.', err);
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();

/**
 * Handles server shutdown gracefully by disconnecting from the database.
 * - Attempts to disconnect from the database before shutting down the server.
 * - Logs a success message if the disconnection is successfull.
 * - If an error occurs during disconnection, it is logged to the console.
 * - Exits the process with status code '0' (indicating a successfull shutdown).
 */
const handleServerShutdown = async () => {
  try {
    await disconnectFromDatabase();
    logger.warn('Server ShutDown');
    process.exit(0);
  } catch (err) {
    logger.error('Error during server shutdown.', err);
  }
};

/**
 * Listens for termination signals ('SIGTERM' and 'SIGINT').
 * - 'SIGTERM' is typically sent when stopping a process (e.g., 'kill' command or container shutdown),
 * - 'SIGINT' is triggered when the user interrupts the process (e.g., pressing 'Ctrl + C'),
 * - When either signal is reveived, 'handleServerShutdown' is eecuted to ensure proper cleanup.
 */
process.on('SIGTERM', handleServerShutdown);
process.on('SIGINT', handleServerShutdown);
