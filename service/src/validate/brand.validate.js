import Joi from "joi";

export const createBrandValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Brand name is required.",
  }),
  description: Joi.string().allow("").optional(),
});

export const updateBrandValidation = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().allow("").optional(),
  isActive: Joi.boolean().optional(),
});
