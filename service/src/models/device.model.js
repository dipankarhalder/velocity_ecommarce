/** Node modules */
import { Schema, model } from "mongoose";

/** user auth role */
const userAuthRole = ["register", "login"];

/** Device schema */
const deviceSchema = new Schema(
  {
    ipAddress: { type: String, require: true },
    browser: { type: String, require: true },
    browserVersion: { type: String, require: true },
    device: { type: String, require: true },
    deviceType: { type: String, require: true },
    os: { type: String, require: true },
    osVersion: { type: String, require: true },
    logType: {
      type: String,
      require: true,
      enum: userAuthRole,
      default: "login",
    },
    userId: { type: Schema.Types.ObjectId, require: true },
  },
  { timestamps: true },
);

export const Device = model("Device", deviceSchema);
