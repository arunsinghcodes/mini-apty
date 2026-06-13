import express, { type Express } from "express";
import cors from "cors";
import healthRouter from "./routes/health.js";
import authRoutes from "./routes/auth.js";

const app: Express = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use("/health", healthRouter);
app.use("/auth", authRoutes);

export default app;

// arunsinghsnd_db_user
// mf7N4MYdO16KtKsH
