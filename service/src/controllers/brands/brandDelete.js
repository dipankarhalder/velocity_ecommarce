/** Custom modules */
import { logger } from "../../core/logger.core.js";

/** Models */
import { Brand } from "../../models/brand.model.js";

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({
        message: "Brand not found.",
      });
    }
    await brand.deleteOne();

    logger.info(`Brand deleted: ${brand.name}`);
    res.status(200).json({
      message: "Brand deleted successfully.",
    });
  } catch (err) {
    logger.error(`Delete Brand Error: ${err.message}`);

    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
