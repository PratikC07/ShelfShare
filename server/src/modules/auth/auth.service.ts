// server/src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type LoginSchema, type RegisterSchema } from "./auth.types.js";
import { UserModel } from "../../models/user.model.js";
import { ReferralModel } from "../../models/referral.model.js";
import { config } from "../../config/index.js";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/errors.js";
import { generateUniqueReferralCode } from "../../utils/generateReferralCode.js";

export const registerUser = async (input: RegisterSchema) => {
  const { name, email, password, referralCode } = input;

  // 1. Check if user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ConflictError("User with this email already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // 3. Generate a *new* unique code for this user
  const newReferralCode = await generateUniqueReferralCode();

  // 4. Create new user
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    referralCode: newReferralCode, // Their *own* new code
  });
  await newUser.save();

  // 5. **Handle the referral logic**
  if (referralCode) {
    // Find the user who *owns* the code that was provided
    const referrer = await UserModel.findOne({ referralCode });
    if (!referrer) {
      throw new NotFoundError("Invalid referral code");
    }
    // --- 💡 ATOMIC UPDATE ---
    // Atomically increment the referrer's count
    await Promise.all([
      ReferralModel.create({
        referrer: referrer._id,
        referred: newUser._id,
        status: "pending",
      }),
      UserModel.findByIdAndUpdate(
        referrer._id,
        { $inc: { referredUsersCount: 1 } } // Increment the counter
      ),
    ]);
  }

  // 6. Sign JWT
  const token = jwt.sign({ userId: newUser.id }, config.jwtSecret, {
    expiresIn: "1d",
  });

  // Use destructuring to safely exclude the password
  const { password: _, ...userObject } = newUser.toObject();

  return { token, user: userObject };
};

export const loginUser = async (input: LoginSchema) => {
  const { email, password } = input;

  const user = await UserModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: "1d",
  });

  // Use destructuring to safely exclude the password
  const { password: _, ...userObject } = user.toObject();

  return { token, user: userObject };
};
