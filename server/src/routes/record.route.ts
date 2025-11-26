import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import type { TotalRecord } from "../types/record/record.type.js";
import mongoose from "mongoose";
import recordModel from "../models/record.model.js";
import recordCoordModel from "../models/recordCoord.model.js";

export const recordRouter = express.Router();

type RecordSaveBodyType = TotalRecord;

recordRouter.post(
  "/",
  async (
    req: Request<{}, {}, RecordSaveBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    const { timeRecord, calories, lineCoords, pace, totalDistance } = req.body;
    const userId = req.userId;

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const createRecordRes = await recordModel.create(
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

      if (!createRecordRes) {
        throw new Error("recordId is null");
      }

      const recordId = createRecordRes[0]?._id;

      const createCoordsRes = await recordCoordModel.create(
        [{ coords: lineCoords, recordId }],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      res.status(201).send({
        message: "기록이 저장되었습니다",
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }
);
