import express, { type Express } from "express";
import cors from "cors";
import healthRouter from "./routes/health.js";

const app: Express = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use("/health", healthRouter);

export default app;