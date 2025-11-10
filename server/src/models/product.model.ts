// server/src/models/product.model.ts
import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String, // Path to the image
      required: true,
    },
    downloadUrl: {
      type: String, // Path to the mock PDF file
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductModel = model("Product", productSchema);
