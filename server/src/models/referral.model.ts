// server/src/models/referral.model.ts
import { Schema, model } from "mongoose";

const referralSchema = new Schema(
  {
    referrer: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who *shared* the link (Lina)
      required: true,
    },
    referred: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who *signed up* (Ryan)
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "converted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const ReferralModel = model("Referral", referralSchema);
