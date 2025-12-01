/** Node modules */
import { Schema, model } from "mongoose";
import slugify from "slugify";

const variantSchema = new Schema(
  {
    sku: { type: String, required: true },
    color: { type: String },
    size: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
  },
  { _id: true },
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, default: "" },
    description: { type: String, required: true },
    shortDescription: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number, default: null },
    stock: { type: Number, default: 0 },
    sku: { type: String, required: true, unique: true },
    images: [{ url: { type: String, required: true }, alt: { type: String } }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", default: null },
    tags: [{ type: String }],
    variants: [variantSchema],
    attributes: [{ key: String, value: String }],
    seoTitle: { type: String },
    seoDescription: { type: String },
    keywords: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
  },
  { timestamps: true },
);

ProductSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const Product = model("Product", ProductSchema);
