/** Custom modules */
import { logger } from "../../core/logger.core.js";
import { saveUploadedFile, markPreviousImagesUnused } from "../../core/filehelper.core.js";

/** Models */
import { Category } from "../../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const userId = req.userId?.toString();
    const { name, description } = req.body;

    /** Check if category already exists */
    const existCategory = await Category.exists({ name });
    if (existCategory) {
      return res.status(400).json({
        message: `Category "${name}" already exists.`,
      });
    }

    /** Image upload */
    let uploadedFile = null;
    if (req.file) {
      uploadedFile = await saveUploadedFile(req.file, "category", userId);
      await markPreviousImagesUnused("category", userId, uploadedFile._id);
    }

    /** Create category (slug auto generated) */
    const category = new Category({
      name,
      description,
      createBy: userId,
      updatedBy: userId,
      categoryImage: uploadedFile?.path || "",
    });

    await category.save();
    logger.info(`Category created: ${category.name}`);
    res.status(201).json({
      category,
      file: uploadedFile,
      message: "Category created successfully.",
    });
  } catch (err) {
    logger.error(`Create Category Error: ${err.message}`);
    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
