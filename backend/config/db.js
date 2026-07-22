import mongoose from "mongoose";

console.log("URI:", process.env.MONGODB_URI);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ DB CONNECTED");
  } catch (error) {
    console.error(error);
  }
};