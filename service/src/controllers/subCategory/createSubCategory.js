import { logger } from "../../core/logger.core.js";
import { saveUploadedFile, markPreviousImagesUnused } from "../../core/filehelper.core.js";
import { SubCategory } from "../../models/subCategory.model.js";

export const createSubCategory = async (req, res) => {
  try {
    const userId = req.userId?.toString();
    const { name, description, categoryId } = req.body;

    /** Check if sub-category exists in same category */
    const exist = await SubCategory.exists({ name, categoryId });
    if (exist) {
      return res.status(400).json({
        message: `SubCategory "${name}" already exists under this category.`,
      });
    }

    let uploadedFile = null;
    if (req.file) {
      uploadedFile = await saveUploadedFile(req.file, "subCategory", userId);
      await markPreviousImagesUnused("subCategory", userId, uploadedFile._id);
    }

    const subCategory = new SubCategory({
      name,
      description,
      categoryId,
      createBy: userId,
      updatedBy: userId,
      subCategoryImage: uploadedFile?.path || "",
    });
    await subCategory.save();

    logger.info(`SubCategory created: ${subCategory.name}`);
    res.status(201).json({
      subCategory,
      file: uploadedFile,
      message: "SubCategory created successfully.",
    });
  } catch (err) {
    logger.error(`Create SubCategory Error: ${err.message}`);
    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
