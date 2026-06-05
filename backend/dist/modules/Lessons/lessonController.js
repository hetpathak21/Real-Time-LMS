"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadLessonContent = exports.deleteLesson = exports.updateLesson = exports.getLessonById = exports.getCourseLessons = exports.createLesson = void 0;
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const StatusCodes_1 = require("../../constants/StatusCodes");
const lessonService_1 = require("./lessonService");
const getUploadedFileUrl = (file) => {
    if (!file)
        return undefined;
    // Cloudinary multer-storage-cloudinary gives uploaded file URL in file.path.
    return file.path;
};
const safeFileName = (value) => value.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-").slice(0, 120);
const getExtensionFromMime = (mimeType) => {
    if (mimeType === "application/pdf")
        return ".pdf";
    if (mimeType === "application/msword")
        return ".doc";
    if (mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        return ".docx";
    }
    if (mimeType?.startsWith("video/mp4"))
        return ".mp4";
    return "";
};
const buildDownloadFileName = (title, originalName, mimeType, lessonType) => {
    const baseName = originalName || title || "lesson-file";
    const safeName = safeFileName(baseName);
    const extension = path_1.default.extname(safeName) ||
        getExtensionFromMime(mimeType) ||
        (lessonType === "pdf" ? ".pdf" : "") ||
        (lessonType === "document" ? ".docx" : "");
    const nameWithoutExtension = extension
        ? safeFileName(path_1.default.basename(safeName, extension))
        : safeName;
    return `${nameWithoutExtension || "lesson-file"}${extension}`;
};
exports.createLesson = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params;
    const lessonPayload = {
        ...req.body,
        contentUrl: getUploadedFileUrl(req.file) || req.body.contentUrl,
        fileName: req.file?.originalname || req.body.fileName,
        mimeType: req.file?.mimetype || req.body.mimeType,
    };
    const lesson = await (0, lessonService_1.createLessonService)(courseId, teacherId, lessonPayload);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.CREATED, true, "Lesson created successfully", lesson);
});
exports.getCourseLessons = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { courseId } = req.params;
    const lessons = await (0, lessonService_1.getCourseLessonsService)(courseId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Lessons fetched successfully", lessons);
});
exports.getLessonById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { lessonId } = req.params;
    const lesson = await (0, lessonService_1.getLessonByIdService)(lessonId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Lesson fetched successfully", lesson);
});
exports.updateLesson = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { lessonId } = req.params;
    const lessonPayload = {
        ...req.body,
        contentUrl: getUploadedFileUrl(req.file) || req.body.contentUrl,
        fileName: req.file?.originalname || req.body.fileName,
        mimeType: req.file?.mimetype || req.body.mimeType,
    };
    const lesson = await (0, lessonService_1.updateLessonService)(lessonId, teacherId, lessonPayload);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Lesson updated successfully", lesson);
});
exports.deleteLesson = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { lessonId } = req.params;
    await (0, lessonService_1.deleteLessonService)(lessonId, teacherId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Lesson deleted successfully");
});
exports.downloadLessonContent = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { lessonId } = req.params;
    const lesson = await (0, lessonService_1.getLessonByIdService)(lessonId);
    if (!lesson.contentUrl) {
        return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.NOT_FOUND, false, "Lesson file not found");
    }
    const upstream = await fetch(lesson.contentUrl);
    if (!upstream.ok || !upstream.body) {
        return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.BAD_REQUEST, false, "Unable to download lesson file");
    }
    const contentType = lesson.mimeType ||
        upstream.headers.get("content-type") ||
        "application/octet-stream";
    const fileName = buildDownloadFileName(lesson.title, lesson.fileName, contentType, lesson.type);
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    stream_1.Readable.fromWeb(upstream.body).pipe(res);
});
