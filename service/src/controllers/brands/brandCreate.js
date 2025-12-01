/** Custom modules */
import { logger } from "../../core/logger.core.js";
import { saveUploadedFile, markPreviousImagesUnused } from "../../core/filehelper.core.js";

/** Models */
import { Brand } from "../../models/brand.model.js";

export const createBrand = async (req, res) => {
  try {
    const userId = req.userId?.toString();
    const { name, description } = req.body;

    /** Check if brand already exists */
    const existBrand = await Brand.exists({ name });
    if (existBrand) {
      return res.status(400).json({
        message: `Brand "${name}" already exists.`,
      });
    }

    if (!userId) {
      return res.status(400).json({
        message: "User ID missing.",
      });
    }

    /** Handle brand image upload if provided */
    let uploadedFile = null;
    if (req.file) {
      /** Save file to DB */
      uploadedFile = await saveUploadedFile(req.file, "brand", userId);

      /** Mark previous brand images as unused for this user */
      await markPreviousImagesUnused("brand", userId, uploadedFile._id);
    }

    /** Create new brand — pre save hook auto generates slug */
    const brand = new Brand({
      name,
      description,
      createBy: userId,
      updatedBy: userId,
      brandImage: uploadedFile?.path || "",
    });

    await brand.save();
    logger.info(`Brand created successfully: ${brand.name}`);

    res.status(201).json({
      brand,
      file: uploadedFile,
      message: "Brand created successfully.",
    });
  } catch (err) {
    logger.error(`Create Brand Error: ${err.message}`);

    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
