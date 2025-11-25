import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import Users from "../models/users.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const authRouter = express.Router();

interface RegisterBody {
  email: string;
  password: string;
  nickname: string;
}

// 회원가입
authRouter.post(
  "/register",
  async (
    req: Request<{}, {}, RegisterBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, nickname } = req.body;

      const isDuplicate = await Users.findOne({ email });

      if (isDuplicate) {
        res.status(401).send({ messasge: "이미 존재하는 이메일입니다." });
        return;
      }

      const hashed = await bcrypt.hash(password, 10);

      await Users.create({ email, password: hashed, nickname });

      return res.status(201).send({ message: "회원가입 완료" });
    } catch (error) {
      next(error);
    }
  }
);

// 로그인
interface LoginBody {
  email: string;
  password: string;
}

authRouter.post(
  "/login",
  async (
    req: Request<{}, {}, LoginBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const isExistsUser = await Users.findOne({ email });

      if (!isExistsUser) {
        res
          .status(400)
          .send({ message: "이메일 또는 비밀번호를 확인해주세요." });
        return;
      }

      const isPasswordCompare = await bcrypt.compare(
        password,
        isExistsUser.password
      );

      if (!isPasswordCompare) {
        res
          .status(400)
          .send({ message: "이메일 또는 비밀번호를 확인해주세요" });
        return;
      }

      const token = jwt.sign(
        { email, userId: isExistsUser._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).send({
        token,
        userId: isExistsUser._id,
      });
    } catch (error) {
      next(error);
    }
  }
);
