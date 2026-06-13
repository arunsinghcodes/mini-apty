import { Router } from "express";

const router: Router = Router();

import { signupController } from "../controllers/auth.controller.js";

router.post("/signup", signupController);

export default router;
