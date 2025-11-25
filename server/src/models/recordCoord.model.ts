import type { Document } from "mongodb";
import mongoose, { Schema, type Date } from "mongoose";
import type { LatLng } from "../types/record/record.type.js";

export interface IRecordCoord extends Document {
  recordId: string;
  coords: LatLng[];
  createdAt: Date;
}

const recordCoordSchema = new Schema<IRecordCoord>({
  recordId: {
    type: String,
    required: true,
  },
  coords: {
    type: [
      {
        latitude: { type: Number },
        longitude: { type: Number },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const recordCoordModel = mongoose.model<IRecordCoord>(
  "recordCoord",
  recordCoordSchema
);

export default recordCoordModel;
