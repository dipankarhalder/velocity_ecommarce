/** Node modules */
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

/** User schema object */
const UserSchema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    profileImage: { type: String, default: "" },
  },
  { timestamps: true },
);

/** hasing the password */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

export const User = model("User", UserSchema);
