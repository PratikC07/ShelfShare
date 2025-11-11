// server/src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type LoginSchema, type RegisterSchema } from "./auth.types.js";
import { UserModel } from "../../models/user.model.js";
import { ReferralModel } from "../../models/referral.model.js";
import { config } from "../../config/index.js";
import {
  ApiError,
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/errors.js";
import { generateUniqueReferralCode } from "../../utils/generateReferralCode.js";
import mongoose from "mongoose";

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

  // We need to save the new user *within* the transaction
  // so we create the object instance first.
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    referralCode: newReferralCode, // Their *own* new code
  });

  // 4. **Start MongoDB Transaction**
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      // 4a. Save the new user
      await newUser.save({ session }); // <-- Pass session

      // 4b. **Handle the referral logic (inside the transaction)**
      if (referralCode) {
        // Find the user who *owns* the code that was provided
        const referrer = await UserModel.findOne({ referralCode }).session(
          session
        );
        if (!referrer) {
          // This will cause the transaction to abort and roll back the user creation
          throw new NotFoundError("Invalid referral code");
        }

        // --- 💡 ATOMIC TRANSACTIONAL UPDATES ---
        await ReferralModel.create(
          [
            {
              referrer: referrer._id,
              referred: newUser._id,
              status: "pending",
            },
          ],
          { session } // <-- Pass session
        );

        await UserModel.updateOne(
          { _id: referrer._id },
          { $inc: { referredUsersCount: 1 } },
          { session } // <-- Pass session
        );
      }
    }); // <-- Transaction ends and commits here
  } catch (error) {
    // If anything fails (like "Invalid referral code"), the transaction
    // will be rolled back and the user will not be created.
    console.error("MongoDB Transaction Error in registerUser:", error);

    // Re-throw the specific error if it's one we know
    if (error instanceof ApiError) {
      throw error;
    }
    // Otherwise throw a generic error
    throw new BadRequestError("User registration failed, please try again.");
  } finally {
    await session.endSession();
  }

  // 5. Sign JWT
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
