"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AuthRoutes_1 = require("./modules/Auth/AuthRoutes");
const adminRoute_1 = require("./modules/Admin/adminRoute");
const courseRoute_1 = require("./modules/Course/courseRoute");
const lessionRoute_1 = require("./modules/Lessions/lessionRoute");
const appError_1 = require("./utils/appError");
const StatusCodes_1 = require("./constants/StatusCodes");
const Messages_1 = require("./constants/Messages");
const app = (0, express_1.default)();
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5174"].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
app.use("/api/v1/lesson", lessionRoute_1.LessonRoutes);
app.use((err, _req, res, _next) => {
    if (err instanceof appError_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    console.error(err);
    return res.status(StatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: Messages_1.GENERAL_MESSAGES.SERVER_ERROR,
    });
});
exports.default = app;
