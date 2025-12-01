import Joi from "joi";

export const createCategoryValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Category name is required.",
  }),
  description: Joi.string().allow("").optional(),
});

export const updateCategoryValidation = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().allow("").optional(),
  isActive: Joi.boolean().optional(),
});
