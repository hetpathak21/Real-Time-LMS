"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseStudents = exports.updateLastAccessed = exports.getEnrollmentProgress = exports.getMyEnrolledCourses = exports.enrollCourse = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const StatusCodes_1 = require("../../constants/StatusCodes");
const appError_1 = require("../../utils/appError");
const enrollmentService_1 = require("./enrollmentService");
exports.enrollCourse = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const studentId = req.user?.userId;
    const { courseId } = req.params;
    if (!studentId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const enrollment = await (0, enrollmentService_1.enrollCourseService)(courseId, studentId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.CREATED, true, "Course enrolled successfully", enrollment);
});
exports.getMyEnrolledCourses = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const studentId = req.user?.userId;
    if (!studentId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const result = await (0, enrollmentService_1.getMyEnrolledCoursesService)(studentId, req.query);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Enrolled courses fetched successfully", result);
});
exports.getEnrollmentProgress = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const studentId = req.user?.userId;
    const { courseId } = req.params;
    if (!studentId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const progress = await (0, enrollmentService_1.getEnrollmentProgressService)(courseId, studentId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Enrollment progress fetched successfully", progress);
});
exports.updateLastAccessed = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const studentId = req.user?.userId;
    const { courseId } = req.params;
    if (!studentId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const enrollment = await (0, enrollmentService_1.updateLastAccessedService)(courseId, studentId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Last accessed time updated successfully", enrollment);
});
exports.getCourseStudents = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params;
    if (!teacherId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const result = await (0, enrollmentService_1.getCourseStudentsService)(courseId, teacherId, req.query);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Course students fetched successfully", result);
});
