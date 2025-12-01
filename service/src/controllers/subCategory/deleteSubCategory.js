import { logger } from "../../core/logger.core.js";
import { SubCategory } from "../../models/subCategory.model.js";

export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id);
    if (!subCategory) return res.status(404).json({ message: "SubCategory not found." });

    await subCategory.deleteOne();
    logger.info(`SubCategory deleted: ${subCategory.name}`);
    res.status(200).json({ message: "SubCategory deleted successfully." });
  } catch (err) {
    logger.error(`Delete SubCategory Error: ${err.message}`);
    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
