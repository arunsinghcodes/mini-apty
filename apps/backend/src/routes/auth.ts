import { Router } from "express";

const router: Router = Router();

import { loginController, signupController } from "../controllers/auth.controller.js";

router.post("/signup", signupController);
router.post("/login", loginController);

export default router;
