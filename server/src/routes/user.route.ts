import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import Users from "../models/users.model.js";

export const userRouter = express.Router();

type GetUserParam = {
  userId: string;
};

userRouter.get(
  "/:userId",
  async (
    req: Request<GetUserParam, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;
      const user = await Users.findOne({ _id: userId });

      if (!user) {
        res.status(404).send({ message: "존재하지 않는 유저입니다." });
        return;
      }

      res.status(200).send({ user });
    } catch (error) {
      next(error);
    }
  }
);
