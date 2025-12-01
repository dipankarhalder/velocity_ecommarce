/** Custom modules */
import { logger } from "../../core/logger.core.js";

/** Models */
import { Category } from "../../models/category.model.js";

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }
    await category.deleteOne();

    logger.info(`Category deleted: ${category.name}`);
    res.status(200).json({
      message: "Category deleted successfully.",
    });
  } catch (err) {
    logger.error(`Delete Category Error: ${err.message}`);

    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
