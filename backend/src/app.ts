import express from "express";
import cors from "cors";
import { AuthRoutes } from "./modules/Auth/AuthRoutes";
import { CourseRoutes } from "./modules/Course/courseRoute";
import { LessonRoutes } from "./modules/Lessions/lessionRoute";

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

app.use("/auth", AuthRoutes);
app.use("/course", CourseRoutes);
app.use("/course", LessonRoutes);

export default app;
