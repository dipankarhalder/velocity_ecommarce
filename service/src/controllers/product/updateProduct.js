/** Custom modules */
import { logger } from "../../core/logger.core.js";
import { saveUploadedFile } from "../../core/filehelper.core.js";

/** Models */
import { Product } from "../../models/product.model.js";

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};
    const userId = req.userId.toString();
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    /** Update simple fields */
    const updatable = [
      "name",
      "description",
      "shortDescription",
      "price",
      "salePrice",
      "stock",
      "category",
      "subCategory",
      "brand",
      "seoTitle",
      "seoDescription",
      "isFeatured",
      "isActive",
    ];

    updatable.forEach((field) => {
      if (body[field] !== undefined) product[field] = body[field];
    });

    if (body.tags) product.tags = JSON.parse(body.tags);
    if (body.keywords) product.keywords = JSON.parse(body.keywords);
    if (body.attributes) product.attributes = JSON.parse(body.attributes);
    if (body.variants) product.variants = JSON.parse(body.variants);

    /** Handle image uploads */
    const imageFiles = req.files || [];
    for (const file of imageFiles) {
      const savedFile = await saveUploadedFile(file, "product", userId);
      product.images.push({ url: savedFile.path, alt: product.name });
    }

    /** Update slug if name changed */
    if (body.name) {
      product.slug = body.name.toLowerCase().replace(/\s+/g, "-");
    }

    await product.save();
    logger.info(`Product updated: ${product.name}`);
    res.status(200).json({
      product,
      message: "Product updated successfully.",
    });
  } catch (err) {
    logger.error(`Update Product Error: ${err.message}`);
    res.status(500).json({
      message: "Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
