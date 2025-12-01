/** Node modules */
import { createLogger, format, transports } from "winston";

/** Custom modules */
import { envConfig } from "../config/dotenv.config.js";

/** Destructure the format object from winston */
const { combine, timestamp, label, printf } = format;

/** Logger format */
const logFormat = printf(({ message, label, timestamp }) => {
  return `${timestamp} [${label}]: ${message}`;
});

/** Create logger */
export const logger = createLogger({
  format: combine(label({ label: envConfig.LOG_LEVEL || "info" }), timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), logFormat),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: "combined.log" }),
  ],
});
