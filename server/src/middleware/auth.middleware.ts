import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

export const authCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).send({
        message: "로그인이 필요한 서비스입니다.",
      });
      return;
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token!, process.env.JWT_SECRET!);

    if (!decoded) {
      throw Error("유효하지 않은 토큰입니다");
    }
    next();
  } catch (error) {
    next(error);
  }
};
