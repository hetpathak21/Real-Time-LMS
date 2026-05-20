import express from "express";
import cors from "cors";

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

export default app;