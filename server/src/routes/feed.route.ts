import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import feedModel from "../models/feed.models.js";
export const feedRouter = express.Router();

type UploadBodyType = {
  writerId: string;
  content: string;
  images: string[];
};

feedRouter.post(
  "/upload",
  async (
    req: Request<{}, {}, UploadBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { writerId, content, images } = req.body;

      const res = await feedModel.create({
        writerId,
        content,
        images,
      });
    } catch (error) {
      throw Error("feed Upload Failed");
    }
  }
);
