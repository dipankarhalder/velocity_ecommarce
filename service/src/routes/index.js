/** Node modules */
import express from "express";

/** Custom modules */
import { login } from "../controllers/auth/login.js";
import { register } from "../controllers/auth/register.js";
import { refreshToken } from "../controllers/auth/refreshToken.js";
import { logout } from "../controllers/auth/logout.js";
import { details } from "../controllers/profile/details.js";
import { updateProfile } from "../controllers/profile/updateProfile.js";
import { uploadImage } from "../controllers/profile/uploadImage.js";

/** Middlewares */
import { authenticate } from "../middleware/authenticate.middleware.js";
import { requireRefreshToken } from "../middleware/refreshToken.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { upload } from "../middleware/uploadFile.middleware.js";

/** Validation */
import {
  registerValidation,
  loginValidation,
  updateAccountValidation,
} from "../validate/user.validate.js";

/** Initialize router */
const router = express.Router();

/** route lists */
router.post(
  "/auth/login",
  validate(loginValidation),
  login,
);
router.post(
  "/auth/register",
  validate(registerValidation),
  register,
);
router.post(
  "/auth/refresh-token",
  requireRefreshToken,
  refreshToken,
);
router.post("/auth/logout", authenticate, logout);

/** Profile */
router.get("/profile/me", authenticate, details);
router.put(
  "/profile/update",
  validate(updateAccountValidation),
  authenticate,
  updateProfile,
);
router.post(
  "/profile/upload",
  authenticate,
  upload.single("profileImage"),
  uploadImage,
);

export default router;
