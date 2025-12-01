/** Custom modules */
import { logger } from "../../core/logger.core.js";

/** Models */
import { Category } from "../../models/category.model.js";

export const categoryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("createBy", "username email").populate("updatedBy", "username email").lean();

    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    logger.info("Category details fetched.");
    res.status(200).json({
      category,
      message: "Category details fetched successfully.",
    });
  } catch (err) {
    logger.error(`Category Details Error: ${err.message}`);

    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
