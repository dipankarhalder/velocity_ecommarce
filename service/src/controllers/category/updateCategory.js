/** Custom modules */
import { logger } from "../../core/logger.core.js";
import { saveUploadedFile, markPreviousImagesUnused } from "../../core/filehelper.core.js";

/** Models */
import { Category } from "../../models/category.model.js";

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId?.toString();

    /** Safe destructure */
    const body = req.body || {};
    const { name, description, isActive } = body;

    /** Find category */
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    /** Update fields only if provided */
    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (isActive !== undefined) category.isActive = isActive;

    category.updatedBy = userId;

    /** Handle image upload */
    let uploadedFile = null;
    if (req.file) {
      uploadedFile = await saveUploadedFile(req.file, "category", userId);
      await markPreviousImagesUnused("category", userId, uploadedFile._id);
      category.categoryImage = uploadedFile.path;
    }

    await category.save();

    logger.info(`Category updated: ${category.name}`);
    res.status(200).json({
      category,
      file: uploadedFile,
      message: "Category updated successfully.",
    });
  } catch (err) {
    logger.error(`Update Category Error: ${err.message}`);

    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
