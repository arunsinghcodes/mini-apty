import { Request, Response } from "express";
import { signup, login, getCurrentUser } from "../services/auth.service.js";

export async function signupController(req: Request, res: Response) {
  try {
    const result = await signup(req.body);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Signup failed",
    });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const result = await login(req.body);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Invalid credentials",
    });
  }
}

export async function meController(
  req: Request,
  res: Response
) {
  try {
    const userId = (req as any).user.userId;

    const user = await getCurrentUser(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
}