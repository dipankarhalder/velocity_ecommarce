/** Custom modules */
import { Product } from "../../models/product.model.js";
import { logger } from "../../core/logger.core.js";

export const productDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category", "name").populate("subCategory", "name").populate("brand", "name").lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      product,
      message: "Product details fetched successfully.",
    });
  } catch (err) {
    logger.error(`Product Details Error: ${err.message}`);
    res.status(500).json({
      message: "Something went wrong.",
      error: err.message,
    });
  }
};
