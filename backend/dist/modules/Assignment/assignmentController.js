"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeSubmission = exports.getAssignmentSubmissions = exports.submitAssignment = exports.deleteAssignment = exports.publishAssignment = exports.updateAssignment = exports.getAssignmentById = exports.getCourseAssignments = exports.createAssignment = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const appError_1 = require("../../utils/appError");
const StatusCodes_1 = require("../../constants/StatusCodes");
const assignmentService_1 = require("./assignmentService");
const getViewer = (req) => {
    const userId = req.user?.userId;
    const role = req.user?.role;
    if (!userId || !role) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    if (role !== "student" && role !== "teacher" && role !== "admin") {
        throw new appError_1.AppError("Access denied: insufficient permissions", StatusCodes_1.STATUS_CODES.FORBIDDEN);
    }
    return { userId, role };
};
exports.createAssignment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params;
    if (!teacherId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const assignment = await (0, assignmentService_1.createAssignmentService)(courseId, teacherId, req.body);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.CREATED, true, "Assignment created successfully", assignment);
});
exports.getCourseAssignments = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { courseId } = req.params;
    const viewer = getViewer(req);
    const assignments = await (0, assignmentService_1.getCourseAssignmentsService)(courseId, viewer);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Assignments fetched successfully", assignments);
});
exports.getAssignmentById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { assignmentId } = req.params;
    const viewer = getViewer(req);
    const assignment = await (0, assignmentService_1.getAssignmentByIdService)(assignmentId, viewer);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Assignment fetched successfully", assignment);
});
exports.updateAssignment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { assignmentId } = req.params;
    if (!teacherId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const assignment = await (0, assignmentService_1.updateAssignmentService)(assignmentId, teacherId, req.body);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Assignment updated successfully", assignment);
});
exports.publishAssignment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { assignmentId } = req.params;
    const { isPublished } = req.body;
    if (!teacherId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const assignment = await (0, assignmentService_1.setAssignmentPublishStatusService)(assignmentId, teacherId, isPublished);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, isPublished
        ? "Assignment published successfully"
        : "Assignment unpublished successfully", assignment);
});
exports.deleteAssignment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { assignmentId } = req.params;
    if (!teacherId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    await (0, assignmentService_1.deleteAssignmentService)(assignmentId, teacherId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Assignment deleted successfully");
});
exports.submitAssignment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const studentId = req.user?.userId;
    const { assignmentId } = req.params;
    if (!studentId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const submission = await (0, assignmentService_1.submitAssignmentService)(assignmentId, studentId, req.body);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.CREATED, true, "Assignment submitted successfully", submission);
});
exports.getAssignmentSubmissions = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { assignmentId } = req.params;
    if (!teacherId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const submissions = await (0, assignmentService_1.getAssignmentSubmissionsService)(assignmentId, teacherId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Submissions fetched successfully", submissions);
});
exports.gradeSubmission = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { submissionId } = req.params;
    if (!teacherId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const submission = await (0, assignmentService_1.gradeSubmissionService)(submissionId, teacherId, req.body);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Submission graded successfully", submission);
});
