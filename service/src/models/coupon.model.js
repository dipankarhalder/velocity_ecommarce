/** Node modules */
import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, unique: true, uppercase: true },
    description: { type: String, default: "" },
    discountType: { type: String, enum: ["percentage", "flat"], required: true },
    discountValue: { type: Number, required: true },
    minOrderAmount: { type: Number, default: 0 },
    maxDiscountAmount: { type: Number, default: null },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    usageLimit: { type: Number, default: 1 },
    usedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true },
);

export const Coupon = mongoose.model("Coupon", CouponSchema);
