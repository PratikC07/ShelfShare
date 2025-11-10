// server/src/modules/auth/auth.route.ts
import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { loginBodySchema, registerBodySchema } from "./auth.types.js";
import { createRateLimiter } from "../../middlewares/rateLimiter.js";
import { validate } from "../../middlewares/validate.js";

const router = Router();

// Apply a rate limit to auth endpoints
const authLimiter = createRateLimiter({
  windowInSeconds: 15 * 60, // 15 minutes
  maxRequests: 10,
});

router.post("/register", authLimiter, validate(registerBodySchema), register);
router.post("/login", authLimiter, validate(loginBodySchema), login);

export default router;
