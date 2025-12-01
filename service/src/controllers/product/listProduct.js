/** Custom modules */
import { logger } from "../../core/logger.core.js";
import { Product } from "../../models/product.model.js";

export const listProduct = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", category, subCategory, brand } = req.query;
    page = Number(page);
    limit = Number(limit);

    const filter = {};
    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (brand) filter.brand = brand;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("brand", "name")
      .lean();

    res.status(200).json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      message: "Product list fetched successfully.",
    });
  } catch (err) {
    logger.error(`List Product Error: ${err.message}`);
    res.status(500).json({
      message: "Something went wrong.",
      error: err.message,
    });
  }
};
