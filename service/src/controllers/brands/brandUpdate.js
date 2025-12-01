/** Custom modules */
import { logger } from "../../core/logger.core.js";
import {
  saveUploadedFile,
  markPreviousImagesUnused,
} from "../../core/filehelper.core.js";

/** Models */
import { Brand } from "../../models/brand.model.js";

export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;
    const userId = req.userId?.toString();

    /** Check if brand exists */
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({
        message: "Brand not found.",
      });
    }

    /** Update basic fields */
    brand.name = name ?? brand.name;
    brand.description = description ?? brand.description;
    brand.isActive =
      typeof isActive !== "undefined"
        ? isActive
        : brand.isActive;
    brand.updatedBy = userId;

    let uploadedFile = null;

    /** Handle brand image upload */
    if (req.file) {
      /** Save new brand image */
      uploadedFile = await saveUploadedFile(
        req.file,
        "brand",
        userId,
      );

      /** Mark previous brand image as unused */
      await markPreviousImagesUnused(
        "brand",
        userId,
        uploadedFile._id,
      );

      /** Save new image path */
      brand.brandImage = uploadedFile.path;
    }

    /** Save updates (slug auto-updates via pre-save if name changed) */
    await brand.save();

    logger.info(`Brand updated: ${brand.name}`);
    res.status(200).json({
      brand,
      file: uploadedFile,
      message: "Brand updated successfully.",
    });
  } catch (err) {
    logger.error(`Update Brand Error: ${err.message}`);

    res.status(500).json({
      message:
        "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
