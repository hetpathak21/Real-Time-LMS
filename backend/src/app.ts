import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { AuthRoutes } from "./modules/Auth/AuthRoutes";
import { AdminRoutes } from "./modules/Admin/adminRoute";
import { CourseRoutes } from "./modules/Course/courseRoute";
import { LessonRoutes } from "./modules/Lessons/lessonRoute";
import { AppError } from "./utils/appError";
import { STATUS_CODES } from "./constants/StatusCodes";
import { GENERAL_MESSAGES } from "./constants/Messages";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS!"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "LMS API Running",
  });
});

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1/course", CourseRoutes);
app.use("/api/v1/lesson", LessonRoutes);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error(err);

  return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: GENERAL_MESSAGES.SERVER_ERROR,
  });
});

export default app;
