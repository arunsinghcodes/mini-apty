// import app from "./app.js";
// import dotenv from "dotenv";
// import { connectDB } from "./db/connect.js";
// dotenv.config();

// const PORT = process.env.PORT || 8080;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`🚀 Backend running on http://localhost:${PORT}`);
//   });
// });

import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function main() {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
  });

  // Graceful shutdown — important for Docker SIGTERM
  const shutdown = async (signal: string) => {
    console.log(`\n🛑 ${signal} — shutting down...`);
    server.close(async () => {
      await mongoose.disconnect();
      console.log("✅ MongoDB disconnected");
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM")); // Docker sends this
  process.on("SIGINT", () => shutdown("SIGINT")); // Ctrl+C sends this
}

main().catch((err) => {
  console.error("❌ Failed to start:", err);
  process.exit(1);
});
