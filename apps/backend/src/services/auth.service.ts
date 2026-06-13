import bcrypt from "bcryptjs";

import User from "../models/User.js";

import { generateToken } from "../auth/jwt.js";

export async function signup(email: string, password: string) {
  const exists = await User.findOne({ email });

  if (exists) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    passwordHash,
  });

  return {
    token: generateToken(user.id),
  };
}
