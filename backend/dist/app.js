"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AuthRoutes_1 = require("./modules/Auth/AuthRoutes");
const courseRoute_1 = require("./modules/Course/courseRoute");
const lessionRoute_1 = require("./modules/Lessions/lessionRoute");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
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
app.use("/auth", AuthRoutes_1.AuthRoutes);
app.use("/course", courseRoute_1.CourseRoutes);
app.use("/course", lessionRoute_1.LessonRoutes);
exports.default = app;
