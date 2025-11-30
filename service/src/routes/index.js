/** Node modules */
import express from "express";

/** Custom modules */
import { login } from "../controllers/auth/login.js";
import { register } from "../controllers/auth/register.js";
import { refreshToken } from "../controllers/auth/refreshToken.js";
import { logout } from "../controllers/auth/logout.js";

/** Middlewares */
import { authenticate } from "../middleware/authenticate.middleware.js";
import { requireRefreshToken } from "../middleware/refreshToken.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

/** Validation */
import {
  registerValidation,
  loginValidation,
  // updateAccountValidation,
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

export default router;
