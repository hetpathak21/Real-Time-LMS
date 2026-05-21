import express from "express";
import cors from "cors";
import { AuthRoutes } from "./modules/Auth/AuthRoutes";
import { AdminRoutes } from "./modules/Admin/adminRoute";
import { CourseRoutes } from "./modules/Course/courseRoute";
import { LessonRoutes } from "./modules/Lessons/lessonRoute";
import { globalErrorHandler } from "./middleware/GlobalErrorHandler"

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
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

app.use(globalErrorHandler);
export default app;
