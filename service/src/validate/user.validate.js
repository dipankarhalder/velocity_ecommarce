import Joi from "joi";

/** Register validation schema */
export const registerValidation = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "First name is required.",
      "string.min":
        "First name must be at least 2 characters long.",
    }),
  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Last name is required.",
      "string.min":
        "Last name must be at least 2 characters long.",
    }),
  email: Joi.string().trim().email().required().messages({
    "string.email": "Invalid email address.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"),
    )
    .required()
    .messages({
      "string.min":
        "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
});

/** Login validation schema */
export const loginValidation = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"),
    )
    .required()
    .messages({
      "string.min":
        "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
});

/** Update account validation schema */
export const updateAccountValidation = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional()
    .messages({
      "string.min":
        "First name must be at least 2 characters long.",
      "string.max":
        "First name cannot exceed 50 characters.",
    }),
  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional()
    .messages({
      "string.min":
        "Last name must be at least 2 characters long.",
      "string.max":
        "Last name cannot exceed 50 characters.",
    }),
});
