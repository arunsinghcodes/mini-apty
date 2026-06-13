import { Request, Response } from "express";

import { signup } from "../services/auth.service.js";

export async function signupController(req: Request, res: Response) {
  try {
    const result = await signup(req.body.email, req.body.password);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
