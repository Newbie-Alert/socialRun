import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import Follow from "../models/relation.model.js";
import {
  updateOnFollow,
  updateOnUnFollow,
} from "../services/relation.service.js";
import mongoose from "mongoose";

export const relationRouter = express.Router();

type FollowBody = {
  followerId: string;
  followingId: string;
};

// 팔로우
relationRouter.post(
  "/follow",
  async (
    req: Request<{}, {}, FollowBody>,
    res: Response,
    next: NextFunction
  ) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { followerId, followingId } = req.body;
      if (!followingId) {
        res.status(401).send({
          message: "팔로우 대상이 없습니다.",
        });
        return;
      }

      const isAlreadyFollowing = await Follow.findOne({
        followerId,
        followingId,
      });

      if (isAlreadyFollowing) {
        res.status(400).send({
          message: "이미 팔로우 중입니다.",
        });
        return;
      }

      // follow Row 하나 만들고
      await Follow.create(
        [
          {
            followerId,
            followingId,
          },
        ],
        {
          session,
        }
      );

      // 팔로우하는 사람, 당하는 사람의 UserRow 업데이트
      await updateOnFollow({ followerId, followingId, session });

      await session.commitTransaction();
      await session.endSession();

      res.status(200).send({
        message: "팔로우 되었습니다",
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }
);

// 언팔로우
relationRouter.post(
  "/unfollow",
  async (
    req: Request<{}, {}, FollowBody>,
    res: Response,
    next: NextFunction
  ) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { followerId, followingId } = req.body;
      const isFollwing = await Follow.findOne({ followerId, followingId });

      if (!isFollwing) {
        res.status(400).send({
          message: "팔로우 중이 아닙니다",
        });
        return;
      }

      await Follow.deleteOne(
        {
          followerId,
          followingId,
        },
        { session }
      );

      // follow테이블에서 row 제거
      await updateOnUnFollow({ followerId, followingId, session });

      await session.commitTransaction();
      await session.endSession();

      res.status(200).send({ message: "언팔로우 되었습니다." });
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      next(error);
    }
  }
);
