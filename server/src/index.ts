import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { runMongo } from "./lib/mongodb.js";
import { authRouter } from "./routes/auth.route.js";
import { relationRouter } from "./routes/relation.route.js";
import { authCheckMiddleware } from "./middleware/auth.middleware.js";
import { userRouter } from "./routes/user.route.js";
import { storageRouter } from "./routes/storage.route.js";
import { feedRouter } from "./routes/feed.route.js";

dotenv.config();

const PORT = 8080;
const app = express();
const ioServer = createServer(app);
const io = new Server(ioServer);

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// 라우터
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/relation", authCheckMiddleware, relationRouter);
app.use("/storage", storageRouter);
app.use("/feed", authCheckMiddleware, feedRouter);

// 404 핸들러
app.use((req, res) => {
  res.status(404).send("not found!");
});

// 500 핸들러
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    console.log(error.stack);
  }
  res.status(500).send("Internal Server Error");
});

await runMongo();

ioServer.listen(PORT || 8000, () => {
  console.log(`server is listening on ${PORT || 8000}!`);
});
