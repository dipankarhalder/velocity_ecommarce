/** Custom modules */
import { logger } from "../../core/logger.core.js";
import { Product } from "../../models/product.model.js";

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    await product.deleteOne();
    res.status(200).json({
      message: "Product deleted successfully.",
    });
  } catch (err) {
    logger.error(`Delete Product Error: ${err.message}`);
    res.status(500).json({
      message: "Something went wrong.",
      error: err.message,
    });
  }
};
