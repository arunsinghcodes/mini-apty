import { Request, Response } from "express";
import {
  createWalkthrough,
  getWalkthroughById,
  getWalkthroughs,
  updateWalkthrough,
  deleteWalkthrough
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
  try {
    const walkthroughs = await getWalkthroughs(
      (req as any).user.userId
    );

    return res.status(200).json({
      success: true,
      data: walkthroughs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch walkthroughs.",
    });
  }
}

export async function getWalkthroughController(
  req: Request,
  res: Response
) {
  try {
    const walkthrough =
      await getWalkthroughById(
        req.params.id as string,
        (req as any).user.userId
      );

    if (!walkthrough) {
      return res.status(404).json({
        success: false,
        message: "Walkthrough not found.",
      });
    }

    return res.json({
      success: true,
      data: walkthrough,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
}



export async function updateWalkthroughController(
  req: Request,
  res: Response
) {
  try {
    const walkthrough = await updateWalkthrough(
      req.params.id as string,
      (req as any).user.userId,
      req.body
    );

    if (!walkthrough) {
      return res.status(404).json({
        success: false,
        message: "Walkthrough not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: walkthrough,
      message: "Walkthrough updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update walkthrough.",
    });
  }
}

export async function deleteWalkthroughController(
  req: Request,
  res: Response
) {
  try {
    const walkthrough = await deleteWalkthrough(
      req.params.id as string,
      (req as any).user.userId
    );

    if (!walkthrough) {
      return res.status(404).json({
        success: false,
        message: "Walkthrough not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Walkthrough deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete walkthrough.",
    });
  }
}
