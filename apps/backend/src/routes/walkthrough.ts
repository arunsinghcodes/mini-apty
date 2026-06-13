import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createWalkthroughController,
  deleteWalkthroughController,
  getWalkthroughController,
  getWalkthroughsController,
  updateWalkthroughController,
} from "../controllers/walkthrough.controller.js";

const router: Router = Router();

// Protect all walkthrough routes
router.use(authMiddleware);

// Create a new walkthrough
router.post("/", createWalkthroughController);

// Get all walkthroughs for logged-in user
router.get("/", getWalkthroughsController);

router.get("/:id", getWalkthroughController);

router.put("/:id", updateWalkthroughController);

router.delete("/:id", deleteWalkthroughController);

export default router;
