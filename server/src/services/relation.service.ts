import type mongoose from "mongoose";
import Users from "../models/users.model.js";

type OnFollowParams = {
  followerId: string;
  followingId: string;
  session: mongoose.mongo.ClientSession;
};

export const updateOnFollow = async (params: OnFollowParams) => {
  const { followerId, followingId, session } = params;
  try {
    // 팔로우 당하는 사람 업데이트
    await Users.findOneAndUpdate(
      {
        _id: followingId,
      },
      { $inc: { followerCount: 1 } },
      { new: true, session }
    );

    // 팔로우 하는 사람 업데이트
    await Users.findOneAndUpdate(
      {
        _id: followerId,
      },
      { $inc: { followingCount: 1 } },
      { new: true, session }
    );
  } catch (error) {
    throw Error("팔로우 트랜잭션 에러");
  }
};

export const updateOnUnFollow = async (params: OnFollowParams) => {
  const { followerId, followingId, session } = params;
  try {
    // 언팔로우 당하는 사람 업데이트
    await Users.findOneAndUpdate(
      {
        _id: followingId,
      },
      { $inc: { followerCount: -1 } },
      { new: true, session }
    );

    // 팔로우 하는 사람 업데이트
    await Users.findOneAndUpdate(
      {
        _id: followerId,
      },
      { $inc: { followingCount: -1 } },
      { new: true, session }
    );
  } catch (error) {
    throw Error("팔로우 트랜잭션 에러");
  }
};
