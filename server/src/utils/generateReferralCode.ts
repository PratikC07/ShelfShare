// server/src/utils/generateReferralCode.ts
import { nanoid } from "nanoid";
import { UserModel } from "../models/user.model.js";

export const generateUniqueReferralCode = async (): Promise<string> => {
  let referralCode: string;
  let isUnique = false;

  do {
    // Generates a code like 'A4T-G8B'
    referralCode = nanoid(8)
      .replace(/-/g, "")
      .match(/.{1,3}/g)!
      .join("-")
      .toUpperCase();

    const existingUser = await UserModel.findOne({ referralCode });
    if (!existingUser) {
      isUnique = true;
    }
  } while (!isUnique);

  return referralCode;
};
