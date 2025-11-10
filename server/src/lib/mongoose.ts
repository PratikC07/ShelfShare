// server/src/lib/mongoose.ts
import mongoose from "mongoose";
import { config } from "../config/index.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB Connected...");
  } catch (err: any) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    // Exit process with failure
    process.exit(1);
  }
};
