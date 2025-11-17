import type { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IFeed extends Document {
  writerId: string;
  content: string;
  images: string[];
}

const feedSchema = new Schema<IFeed>({
  writerId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
});

const feedModel = mongoose.model<IFeed>("feed", feedSchema);

export default feedModel;
