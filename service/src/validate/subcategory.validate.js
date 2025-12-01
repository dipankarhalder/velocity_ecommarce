import Joi from "joi";

export const createSubCategoryValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Sub Category name is required.",
  }),
  description: Joi.string().allow("").optional(),
  categoryId: Joi.string().required(),
});

export const updateSubCategoryValidation = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().allow("").optional(),
  categoryId: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});
