// server/src/models/user.model.ts
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    referralCode: {
      type: String,
      required: true,
      unique: true,
    },
    totalCredits: {
      type: Number,
      required: true,
      default: 0,
    },
    purchasedProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
