/** Node modules */
const { Schema, model } = require('mongoose');

/** Token schema */
const tokenSchema = new Schema(
  {
    token: { type: String, require: true },
    username: { type: String, require: true },
    userId: { type: Schema.Types.ObjectId, require: true },
  },
  { timestamps: true },
);

module.exports = model('Token', tokenSchema);
