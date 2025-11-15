import type { Date, Document } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IFollowRow extends Document {
  followerId: string;
  followingId: string;
  createdAt: Date;
}

const followSchema = new Schema<IFollowRow>({
  followerId: {
    type: String,
  },
  followingId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Follow = mongoose.model<IFollowRow>("follow", followSchema);

export default Follow;
