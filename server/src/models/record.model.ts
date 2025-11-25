import type { Document } from "mongodb";
import mongoose, { Schema, type Date } from "mongoose";

export interface IRecord extends Document {
  userId: string;
  calories: number;
  timeRecord: number;
  totalDistance: number;
  pace: string;
  createdAt: Date;
}

const recordSchema = new Schema<IRecord>({
  userId: {
    type: String,
  },
  calories: {
    type: Number,
  },
  timeRecord: {
    type: Number,
  },
  totalDistance: {
    type: Number,
  },
  pace: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const recordModel = mongoose.model<IRecord>("record", recordSchema);

export default recordModel;
