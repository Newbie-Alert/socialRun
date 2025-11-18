import express from "express";
import multer from "multer";
import { supabase } from "../lib/supabase.js";

export const storageRouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

storageRouter.post("/upload", upload.array("files"), async (req, res, next) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files) {
      res.status(400).send({
        messsage: "파일이 없습니다",
      });
      return;
    }

    const uploadPromises = files.map((file) => {
      const unique = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const filePath = `feedMedia/${unique}-${file.originalname}`;

      return supabase.storage
        .from("media")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        })
        .then((res) => {
          const { data, error } = res;

          if (error) {
            console.log(error);
            throw Error("supabase upload Error");
          }

          return data?.path;
        });
    });

    const publicUrl = await Promise.all(uploadPromises);

    return res.status(201).send({
      publicUrl,
    });
  } catch (error) {
    next(error);
  }
});
