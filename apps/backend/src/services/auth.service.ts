import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET =
  process.env.JWT_SECRET || "mini-apty-secret";

export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user,
  };
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user,
  };
}

export async function getCurrentUser(userId: string) {
  return User.findById(userId).select("-password");
}