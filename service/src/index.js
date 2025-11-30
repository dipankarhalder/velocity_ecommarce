/** Node modules */
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

/** Fix for ES modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Custom modules */
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/db.config.js";
import { envConfig } from "./config/dotenv.config.js";
import { logger } from "./core/logger.core.js";
import { ratelimiter } from "./core/ratelimiter.core.js";
import {
  missingRoutes,
  globalError,
} from "./utils/core.utils.js";

/** Config CORS options */
const corsOptions = {
  origin(origin, callback) {
    if (envConfig.NODE_ENV === "development" || !origin) {
      callback(null, true);
    } else {
      callback(
        new Error(
          `CORS error: ${origin} is not allowed by CORS`,
        ),
        false,
      );
      logger.warn(
        `CORS error: ${origin} is not allowed by CORS`,
      );
    }
  },
};

/** Initial express app */
const app = express();

/** Middlewares */
/** Manage CORS in the application */
app.use(cors(corsOptions));

/** Enable JSON request body parsing */
app.use(express.json());

/** Request body parsing with extended mode */
app.use(express.urlencoded({ extended: true }));

/** Manage cookies in the application */
app.use(cookieParser());

/** Enable response compression to reduce payload size and improve performance */
app.use(compression({ threshold: 1024 }));

/** enhance security by setting various HTTP headers */
app.use(helmet());

/** Rate limit middleware to prevent excessive requests and enhance security */
app.use(ratelimiter);

/** Serve static uploads directory */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads")),
);

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
    app.use("/api", (req, res) => {
      res.status(201).json({
        message: "User logged-in successfully.",
      });
    });

    app.use((req, res, next) =>
      missingRoutes(req, res, next),
    );

    app.use((error, req, res) => globalError(res, error));

    /** Run the server */
    app.listen(envConfig.PORT, () => {
      logger.info(`Server running: ${envConfig.PORT}.`);
    });
  } catch (err) {
    logger.error("Failed to start the server.", err);

    if (envConfig.NODE_ENV === "production") {
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
    logger.warn("Server ShutDown");
    process.exit(0);
  } catch (err) {
    logger.error("Error during server shutdown.", err);
  }
};

/**
 * Listens for termination signals ('SIGTERM' and 'SIGINT').
 * - 'SIGTERM' is typically sent when stopping a process (e.g., 'kill' command or container shutdown),
 * - 'SIGINT' is triggered when the user interrupts the process (e.g., pressing 'Ctrl + C'),
 * - When either signal is reveived, 'handleServerShutdown' is eecuted to ensure proper cleanup.
 */
process.on("SIGTERM", handleServerShutdown);
process.on("SIGINT", handleServerShutdown);
