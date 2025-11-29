/** Node modules */
const { Schema, model } = require('mongoose');

/** log role */
const typeLog = ['register', 'login'];

/** Token schema */
const deviceSchema = new Schema(
  {
    ipAddress: { type: String, require: true },
    browser: { type: String, require: true },
    browserVersion: { type: String, require: true },
    device: { type: String, require: true },
    deviceType: { type: String, require: true },
    os: { type: String, require: true },
    osVersion: { type: String, require: true },
    logType: { type: String, require: true, enum: typeLog, default: 'login' },
    userId: { type: Schema.Types.ObjectId, require: true },
  },
  { timestamps: true },
);

module.exports = model('Device', deviceSchema);
