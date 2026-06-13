import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
dotenv.config();

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
  });
});