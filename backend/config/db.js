import mongoose from "mongoose";

export async function connectToDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.log("Error connecting to database");
    process.exit(1);
  }
}