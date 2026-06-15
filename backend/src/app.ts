import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import { AuthRoutes } from "./modules/Auth/AuthRoutes";
import { AdminRoutes } from "./modules/Admin/adminRoute";
import { CourseRoutes } from "./modules/Course/courseRoute";
import { LessonRoutes } from "./modules/Lessons/lessonRoute";
import enrollmentRoutes  from "./modules/Enrollment/enrollmentRoutes"
import  assignmentRoutes  from "./modules/Assignment/assignmentRoutes"
import notificationRoutes from "./modules/Notification/notificationRoutes"
import { globalErrorHandler } from "./middleware/GlobalErrorHandler"

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
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

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
app.use("/api/v1/enrollment", enrollmentRoutes);
app.use("/api/v1/assignment",assignmentRoutes);
app.use("/api/v1/notifications", notificationRoutes);

app.use(globalErrorHandler);
export default app;
