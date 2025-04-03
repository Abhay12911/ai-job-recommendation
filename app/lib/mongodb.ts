import mongoose from "mongoose";
import User from "../models/User";

const MONGODB_URI = process.env.MONGODB_URI as string;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
    console.log(await User.find({}));
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
