// server/src/index.ts
import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import { connectDB } from "./lib/mongoose.js";
import { connectRedis, redisSubscriber } from "./lib/redis.js";

// --- Placeholder Imports (We will create these next) ---
// import apiRouter from "./api.js";
// import { errorHandler } from "./middlewares/errorHandler.js";
// ----------------------------------------------------

const startServer = async () => {
  // 1. Connect to our databases
  await connectDB();
  await connectRedis();

  // Connect the pub/sub client
  await redisSubscriber.connect();

  const app = express();

  // 2. Apply Middlewares
  app.use(cors({ origin: config.clientUrl, credentials: true }));
  app.use(express.json());

  // 3. Routes
  app.get("/api/healthcheck", (req, res) => {
    res.json({ status: "success", message: "API is running." });
  });

  // Mount the main API router
  app.use("/api", apiRouter);

  // 4. Global Error Handler
  app.use(errorHandler);

  // 5. Start Server
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

startServer();
