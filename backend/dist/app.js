"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const AuthRoutes_1 = require("./modules/Auth/AuthRoutes");
const adminRoute_1 = require("./modules/Admin/adminRoute");
const courseRoute_1 = require("./modules/Course/courseRoute");
const lessonRoute_1 = require("./modules/Lessons/lessonRoute");
const enrollmentRoutes_1 = __importDefault(require("./modules/Enrollment/enrollmentRoutes"));
const assignmentRoutes_1 = __importDefault(require("./modules/Assignment/assignmentRoutes"));
const GlobalErrorHandler_1 = require("./middleware/GlobalErrorHandler");
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS!"));
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// Health Route
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "LMS API Running",
    });
});
app.use("/api/v1/auth", AuthRoutes_1.AuthRoutes);
app.use("/api/v1/admin", adminRoute_1.AdminRoutes);
app.use("/api/v1/course", courseRoute_1.CourseRoutes);
app.use("/api/v1/lesson", lessonRoute_1.LessonRoutes);
app.use("/api/v1/enrollment", enrollmentRoutes_1.default);
app.use("/api/v1/assignment", assignmentRoutes_1.default);
app.use(GlobalErrorHandler_1.globalErrorHandler);
exports.default = app;
