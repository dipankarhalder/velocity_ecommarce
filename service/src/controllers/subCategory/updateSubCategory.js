import { logger } from "../../core/logger.core.js";
import { saveUploadedFile, markPreviousImagesUnused } from "../../core/filehelper.core.js";
import { SubCategory } from "../../models/subCategory.model.js";

export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId?.toString();
    const body = req.body || {};
    const { name, description, categoryId, isActive } = body;

    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found." });
    }

    if (name !== undefined) subCategory.name = name;
    if (description !== undefined) subCategory.description = description;
    if (categoryId !== undefined) subCategory.categoryId = categoryId;
    if (isActive !== undefined) subCategory.isActive = isActive;
    subCategory.updatedBy = userId;

    let uploadedFile = null;
    if (req.file) {
      uploadedFile = await saveUploadedFile(req.file, "subCategory", userId);
      await markPreviousImagesUnused("subCategory", userId, uploadedFile._id);
      subCategory.subCategoryImage = uploadedFile.path;
    }
    await subCategory.save();

    logger.info(`SubCategory updated: ${subCategory.name}`);
    res.status(200).json({
      subCategory,
      file: uploadedFile,
      message: "SubCategory updated successfully.",
    });
  } catch (err) {
    logger.error(`Update SubCategory Error: ${err.message}`);
    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
