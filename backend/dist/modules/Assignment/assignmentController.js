"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssignment = exports.updateAssignment = exports.getAssignmentById = exports.getCourseAssignments = exports.createAssignment = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const appError_1 = require("../../utils/appError");
const StatusCodes_1 = require("../../constants/StatusCodes");
const assignmentService_1 = require("./assignmentService");
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
    const assignments = await (0, assignmentService_1.getCourseAssignmentsService)(courseId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Assignments fetched successfully", assignments);
});
exports.getAssignmentById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { assignmentId } = req.params;
    const assignment = await (0, assignmentService_1.getAssignmentByIdService)(assignmentId);
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
exports.deleteAssignment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const teacherId = req.user?.userId;
    const { assignmentId } = req.params;
    if (!teacherId) {
        throw new appError_1.AppError("Unauthorized user", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    await (0, assignmentService_1.deleteAssignmentService)(assignmentId, teacherId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Assignment deleted successfully");
});
