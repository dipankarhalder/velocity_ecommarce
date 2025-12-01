/** Custom modules */
import { logger } from "../../core/logger.core.js";

/** Models */
import { Category } from "../../models/category.model.js";

export const listCategory = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;
    page = Number(page);
    limit = Number(limit);

    const filter = search ? { name: { $regex: search, $options: "i" } } : {};
    const total = await Category.countDocuments(filter);
    const categories = await Category.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    logger.info("Category list fetched.");
    res.status(200).json({
      categories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      message: "Category list fetched successfully.",
    });
  } catch (err) {
    logger.error(`List Category Error: ${err.message}`);

    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
