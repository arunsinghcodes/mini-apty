import { Request, Response } from "express";

import { login, signup } from "../services/auth.service.js";

export async function signupController(req: Request, res: Response) {
  try {
    const { email, password } = req.body ?? {};

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    const result = await signup(email, password);

    return res.status(201).json({
      success: true,
      data: result,
      message: "User registered successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to register user.",
    });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body ?? {};

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    const result = await login(email, password);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Authentication failed.",
    });
  }
}
