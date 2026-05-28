"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLesson = exports.updateLesson = exports.getLessonById = exports.getCourseLessons = exports.createLesson = void 0;
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
exports.createLesson = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params;
    const lessonPayload = {
        ...req.body,
        contentUrl: getUploadedFileUrl(req.file) || req.body.contentUrl,
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
