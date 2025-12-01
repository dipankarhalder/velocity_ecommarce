/** Custom modules */
import { logger } from "../../core/logger.core.js";

/** Models */
import { Brand } from "../../models/brand.model.js";

export const listBrand = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;
    page = Number(page);
    limit = Number(limit);

    const filter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const total = await Brand.countDocuments(filter);
    const brands = await Brand.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    logger.info("Brand list fetched successfully.");
    res.status(200).json({
      brands,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      message: "Brand list fetched successfully.",
    });
  } catch (err) {
    logger.error(`Brand List Error: ${err.message}`);

    res.status(500).json({
      message:
        "Oops! Something went wrong. Please try again.",
      error: err.message,
    });
  }
};
