/** Node modules */
import { Schema, model } from "mongoose";

/** Token schema */
const tokenSchema = new Schema(
  {
    token: { type: String, require: true },
    username: { type: String, require: true },
    userId: { type: Schema.Types.ObjectId, require: true },
  },
  { timestamps: true },
);

export const Token = model("Token", tokenSchema);
