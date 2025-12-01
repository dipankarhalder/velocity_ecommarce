import { logger } from "../../core/logger.core.js";
import { SubCategory } from "../../models/subCategory.model.js";

export const subCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id)
      .populate("categoryId", "name")
      .populate("createBy", "username email")
      .populate("updatedBy", "username email")
      .lean();

    if (!subCategory) return res.status(404).json({ message: "SubCategory not found." });

    logger.info("SubCategory details fetched.");
    res.status(200).json({
      subCategory,
      message: "SubCategory details fetched successfully.",
    });
  } catch (err) {
    logger.error(`SubCategory Details Error: ${err.message}`);
    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
