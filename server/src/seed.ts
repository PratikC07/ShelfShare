import mongoose from "mongoose";
import { ProductModel } from "./models/product.model.js";
import { config } from "./config/index.js";

const dummyProducts = [
  {
    name: "Mastering Next.js",
    description:
      "A complete guide to building production-ready apps with Next.js. Covers App Router, Server Actions, and more.",
    price: 39.99,
    imageUrl: "https://placehold.co/600x400/4F46E5/FFFFFF/png?text=Next.js",
    downloadUrl: "/mock-ebook.pdf",
  },
  {
    name: "The Art of TypeScript",
    description:
      "Go from JavaScript beginner to TypeScript pro. Learn about generics, types, and advanced patterns.",
    price: 29.99,
    imageUrl: "https://placehold.co/600x400/38bdf8/FFFFFF/png?text=TypeScript",
    downloadUrl: "/mock-ebook.pdf",
  },
  {
    name: "Modern Tailwind CSS",
    description:
      "Build beautiful, modern designs without leaving your HTML. Covers utility-first principles and JIT compilation.",
    price: 19.99,
    imageUrl: "https://placehold.co/600x400/06b6d4/FFFFFF/png?text=Tailwind",
    downloadUrl: "/mock-ebook.pdf",
  },
  {
    name: "Docker for Developers",
    description:
      "Containerize your applications with Docker. A step-by-step guide to Docker, Compose, and deployment.",
    price: 24.99,
    imageUrl: "https://placehold.co/600x400/2563eb/FFFFFF/png?text=Docker",
    downloadUrl: "/mock-ebook.pdf",
  },
];

const seedDatabase = async () => {
  console.log("Connecting to database...");
  try {
    await mongoose.connect(config.mongoUri);

    console.log("Cleaning existing products...");
    await ProductModel.deleteMany({});

    console.log("Inserting dummy products...");
    await ProductModel.insertMany(dummyProducts);

    console.log("✅ Database successfully seeded!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
};

seedDatabase();
