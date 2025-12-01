/** Custom modules */
import { logger } from "../../core/logger.core.js";
import { saveUploadedFile } from "../../core/filehelper.core.js";

/** Models */
import { Product } from "../../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const userId = req.userId.toString();
    const {
      name,
      description,
      shortDescription,
      price,
      salePrice,
      stock,
      sku,
      category,
      subCategory,
      brand,
      tags,
      seoTitle,
      seoDescription,
      keywords,
      isFeatured,
      isActive,
      attributes,
      variants,
    } = req.body;

    /** Check if SKU exists */
    const existSKU = await Product.exists({ sku });
    if (existSKU) {
      return res.status(400).json({
        message: `SKU "${sku}" already exists.`,
      });
    }

    /** Process uploaded images */
    const imageFiles = req.files || [];
    const uploadedImages = [];

    for (const file of imageFiles) {
      const savedFile = await saveUploadedFile(file, "product", userId);
      uploadedImages.push({ url: savedFile.path, alt: name });
    }

    /** Create product */
    const product = new Product({
      name,
      description,
      shortDescription,
      price,
      salePrice,
      stock,
      sku,
      images: uploadedImages,
      category,
      subCategory,
      brand,
      tags: tags ? JSON.parse(tags) : [],
      attributes: attributes ? JSON.parse(attributes) : [],
      variants: variants ? JSON.parse(variants) : [],
      seoTitle,
      seoDescription,
      keywords: keywords ? JSON.parse(keywords) : [],
      isFeatured,
      isActive,
    });
    await product.save();

    logger.info(`Product created: ${product.name}`);
    res.status(201).json({
      product,
      message: "Product created successfully.",
    });
  } catch (err) {
    logger.error(`Create Product Error: ${err.message}`);

    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
