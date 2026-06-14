import { Request, Response } from "express";
import Walkthrough from "../models/Walkthrough.js";
import {
  createWalkthrough,
  getWalkthroughs,
  updateWalkthrough,
  deleteWalkthrough,
} from "../services/walkthrough.service.js";

export async function createWalkthroughController(req: Request, res: Response) {
  try {
    const ownerId = (req as any).user.userId;
    const walkthrough = await createWalkthrough({ ...req.body, ownerId });
    return res.status(201).json({ success: true, data: walkthrough });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create walkthrough" });
  }
}

export async function getWalkthroughsController(req: Request, res: Response) {
  try {
    const ownerId = (req as any).user.userId;
    const walkthroughs = await getWalkthroughs(ownerId);
    return res.status(200).json({ success: true, data: walkthroughs });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch walkthroughs" });
  }
}

export async function getWalkthroughController(req: Request, res: Response) {
  try {
    const ownerId = (req as any).user.userId;

    // Check if walkthrough exists at all
    const exists = await Walkthrough.findById(req.params.id);

    if (!exists) {
      // 404 — genuinely doesn't exist
      return res
        .status(404)
        .json({ success: false, message: "Walkthrough not found" });
    }

    if (exists.ownerId?.toString() !== ownerId) {
      // 403 — exists but belongs to someone else
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    return res.json({ success: true, data: exists });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
}

export async function updateWalkthroughController(req: Request, res: Response) {
  try {
    const ownerId = (req as any).user.userId;

    const exists = await Walkthrough.findById(req.params.id);

    if (!exists) {
      return res
        .status(404)
        .json({ success: false, message: "Walkthrough not found" });
    }

    if (exists.ownerId?.toString() !== ownerId) {
      // 403 — authenticated but not the owner
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const updated = await updateWalkthrough(
      req.params.id as string,
      ownerId,
      req.body,
    );

    return res.status(200).json({
      success: true,
      data: updated,
      message: "Walkthrough updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update walkthrough" });
  }
}

export async function deleteWalkthroughController(req: Request, res: Response) {
  try {
    const ownerId = (req as any).user.userId;

    const exists = await Walkthrough.findById(req.params.id);

    if (!exists) {
      return res
        .status(404)
        .json({ success: false, message: "Walkthrough not found" });
    }

    if (exists.ownerId?.toString() !== ownerId) {
      // 403 — exists but user doesn't own it
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    await deleteWalkthrough(req.params.id as string, ownerId);

    return res.status(200).json({
      success: true,
      message: "Walkthrough deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete walkthrough" });
  }
}
