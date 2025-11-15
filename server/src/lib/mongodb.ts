import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
dotenv.config();

const URI = process.env.MONGO_DB_URI;

export const runMongo = async () => {
  try {
    await mongoose.connect(URI!);
    console.log("mongo DB connected");
  } catch (error) {
    console.log("mongoDB connect Failed");
  }
};
