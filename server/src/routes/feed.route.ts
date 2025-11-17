import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { uploadImage } from "../services/supabase.service.js";
import feedModel from "../models/feed.models.js";

export const feedRouter = express.Router();

type ParsedImageList = {
  filename: string;
  buffer: ArrayBuffer;
  mimeType: string;
};

type FeedUploadBody = {
  writerId: string;
  content: string;
  images: ParsedImageList[] | null;
};

feedRouter.post(
  "/upload",
  async (
    req: Request<{}, {}, FeedUploadBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log("start uploadFeed");
      const { writerId, content, images } = req.body;

      const imagePublicUrls = images ? await uploadImage(images) : null;

      await feedModel.create({
        writerId,
        content,
        images: imagePublicUrls,
      });
      res.status(200).send({
        message: "feed uploaded",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
