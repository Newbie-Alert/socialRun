import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import feedModel from "../models/feed.model.js";
import type { TotalRecord } from "../types/record/record.type.js";
import mongoose from "mongoose";
import recordCoordModel from "../models/recordCoord.model.js";
import recordModel from "../models/record.model.js";
export const feedRouter = express.Router();

type UploadBodyType = {
  title: string;
  content: string;
  images: string[] | null;
  totalRecord: TotalRecord;
};

feedRouter.post(
  "/upload",
  async (
    req: Request<{}, {}, UploadBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const { title, content, images, totalRecord } = req.body;
      const userId = req.userId;

      const { lineCoords, calories, pace, timeRecord, totalDistance } =
        totalRecord;

      // 기록 저장
      const recordCreateRes = await recordModel.create(
        [
          {
            calories,
            pace,
            timeRecord,
            totalDistance,
            userId,
          },
        ],
        { session }
      );

      if (!recordCreateRes) {
        throw new Error("record create Failed");
      }

      const recordId = recordCreateRes[0]?._id;

      // 러닝 경로 저장
      const recordCoordCreateRes = await recordCoordModel.create(
        [
          {
            coords: lineCoords,
            recordId: recordId,
          },
        ],
        { session }
      );

      if (!recordCoordCreateRes) {
        throw new Error("recordCoord create Failed");
      }

      // 피드 생성
      const feedCreateRes = await feedModel.create(
        [
          {
            writerId: userId,
            title,
            content,
            images,
            recordId,
          },
        ],
        { session }
      );

      if (!feedCreateRes) {
        throw new Error("Feed creation failed");
      }

      await session.commitTransaction();
      session.endSession();

      res.status(201).send({
        message: "피드가 생성되었습니다",
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      next(error);
    }
  }
);
