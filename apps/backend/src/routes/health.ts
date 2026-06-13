import { Router } from "express";

const router: Router = Router();

router.get("/", (_, res) => {
  res.json({
    status: "ok",
    service: "mini-apty-backend",
  });
});

export default router;