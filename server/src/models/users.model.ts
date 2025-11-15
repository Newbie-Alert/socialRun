import mongoose, { Document, Schema } from "mongoose";

export interface IUsers extends Document {
  email: string;
  password: string;
  nickname: string;
  followerCount: number;
  followingCount: number;
}

const userSchema = new Schema<IUsers>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    unique: true,
    required: true,
  },
  followerCount: {
    type: Number,
    default: 0,
  },
  followingCount: {
    type: Number,
    default: 0,
  },
});

const Users = mongoose.model<IUsers>("user", userSchema);

export default Users;
