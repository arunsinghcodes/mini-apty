import { Request, Response } from "express";
import {
  createWalkthrough,
  getWalkthroughs,
} from "../services/walkthrough.service.js";

export async function createWalkthroughController(
  req: Request,
  res: Response
) {
  const walkthrough =
    await createWalkthrough({
      ...req.body,
      ownerId: (req as any).user.userId,
    });

  res.status(201).json(walkthrough);
}

export async function getWalkthroughsController(
  req: Request,
  res: Response
) {
  const walkthroughs =
    await getWalkthroughs(
      (req as any).user.userId
    );

  res.json(walkthroughs);
}