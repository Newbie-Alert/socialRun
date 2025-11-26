import type { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IFeed extends Document {
  writerId: string;
  writerName: string;
  title: string;
  content: string;
  images: string[] | null;
  recordId: string;
}

const feedSchema = new Schema<IFeed>({
  writerId: {
    type: String,
    required: true,
  },
  writerName: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: null,
  },
  recordId: {
    type: String,
  },
});

const feedModel = mongoose.model<IFeed>("feed", feedSchema);

export default feedModel;
