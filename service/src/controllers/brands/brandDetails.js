/** Custom modules */
import { logger } from "../../core/logger.core.js";

/** Models */
import { Brand } from "../../models/brand.model.js";

export const brandDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id)
      .populate("createBy", "username email")
      .populate("updatedBy", "username email")
      .lean();

    if (!brand) {
      return res.status(404).json({
        message: "Brand not found.",
      });
    }

    logger.info("Brand details fetched successfully.");
    res.status(200).json({
      brand,
      message: "Brand details fetched successfully.",
    });
  } catch (err) {
    logger.error(`Brand Details Error: ${err.message}`);

    res.status(500).json({
      message:
        "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
