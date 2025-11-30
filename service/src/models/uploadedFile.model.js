import { Schema, model } from "mongoose";

const uploadedFileSchema = new Schema(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    module: { type: String, required: true },
    moduleId: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    used: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const UploadedFile = model(
  "UploadedFile",
  uploadedFileSchema,
);
