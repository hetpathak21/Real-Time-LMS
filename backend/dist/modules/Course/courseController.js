"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpublishCourse = exports.publishCourse = exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.getPublishedCourses = exports.getMyCourses = exports.createCourse = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const StatusCodes_1 = require("../../constants/StatusCodes");
const courseService_1 = require("./courseService");
exports.createCourse = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const course = await (0, courseService_1.createCourseService)(req.body, teacherId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.CREATED, true, "Course created successfully", course);
});
exports.getMyCourses = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const result = await (0, courseService_1.getMyCoursesService)(teacherId, req.query);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Courses fetched successfully", result);
});
exports.getPublishedCourses = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await (0, courseService_1.getPublishedCoursesService)(req.query);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Published courses fetched successfully", result);
});
exports.getCourseById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { courseId } = req.params;
    const course = await (0, courseService_1.getCourseByIdService)(courseId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Course fetched successfully", course);
});
exports.updateCourse = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params;
    const course = await (0, courseService_1.updateCourseService)(courseId, teacherId, req.body);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Course updated successfully", course);
});
exports.deleteCourse = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params;
    await (0, courseService_1.deleteCourseService)(courseId, teacherId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Course deleted successfully");
});
exports.publishCourse = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params;
    const course = await (0, courseService_1.publishCourseService)(courseId, teacherId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Course published successfully", course);
});
exports.unpublishCourse = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params;
    const course = await (0, courseService_1.unpublishCourseService)(courseId, teacherId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Course unpublished successfully", course);
});
