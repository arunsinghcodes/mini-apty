import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("✅ Mongo Connected");
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}