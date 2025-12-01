import { logger } from "../../core/logger.core.js";
import { SubCategory } from "../../models/subCategory.model.js";

export const listSubCategory = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", categoryId } = req.query;
    page = Number(page);
    limit = Number(limit);

    const filter = {};
    if (search) filter.name = { $regex: search, $options: "i" };
    if (categoryId) filter.categoryId = categoryId;

    const total = await SubCategory.countDocuments(filter);
    const subCategories = await SubCategory.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("categoryId", "name")
      .lean();

    logger.info("SubCategory list fetched.");
    res.status(200).json({
      subCategories,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
      message: "SubCategory list fetched successfully.",
    });
  } catch (err) {
    logger.error(`List SubCategory Error: ${err.message}`);
    res.status(500).json({
      message: "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
