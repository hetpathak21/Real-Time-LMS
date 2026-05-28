"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssignmentService = exports.updateAssignmentService = exports.getAssignmentByIdService = exports.getCourseAssignmentsService = exports.createAssignmentService = void 0;
const AssignmentModel_1 = __importDefault(require("../../models/AssignmentModel"));
const CourseModel_1 = __importDefault(require("../../models/CourseModel"));
const appError_1 = require("../../utils/appError");
const dbCall_1 = require("../../utils/dbCall");
const StatusCodes_1 = require("../../constants/StatusCodes");
const checkTeacherCourseAccess = async (courseId, teacherId) => {
    const course = await CourseModel_1.default.findOne({
        _id: courseId,
        teacherId,
    });
    if (!course) {
        throw new appError_1.AppError("Course not found or access denied", StatusCodes_1.STATUS_CODES.NOT_FOUND);
    }
    return course;
};
const createAssignmentService = async (courseId, teacherId, payload) => {
    if (!teacherId) {
        throw new appError_1.AppError("Teacher ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        await checkTeacherCourseAccess(courseId, teacherId);
        const assignment = await AssignmentModel_1.default.create({
            ...payload,
            courseId,
            createdBy: teacherId,
        });
        return assignment;
    });
};
exports.createAssignmentService = createAssignmentService;
const getCourseAssignmentsService = async (courseId) => {
    return (0, dbCall_1.dbCall)(async () => {
        const course = await CourseModel_1.default.findById(courseId);
        if (!course) {
            throw new appError_1.AppError("Course not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        const assignments = await AssignmentModel_1.default.find({ courseId })
            .populate("createdBy", "name email avatar")
            .sort({ deadline: 1, createdAt: -1 });
        return assignments;
    });
};
exports.getCourseAssignmentsService = getCourseAssignmentsService;
const getAssignmentByIdService = async (assignmentId) => {
    return (0, dbCall_1.dbCall)(async () => {
        const assignment = await AssignmentModel_1.default.findById(assignmentId)
            .populate("courseId", "title teacherId isPublished")
            .populate("createdBy", "name email avatar");
        if (!assignment) {
            throw new appError_1.AppError("Assignment not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        return assignment;
    });
};
exports.getAssignmentByIdService = getAssignmentByIdService;
const updateAssignmentService = async (assignmentId, teacherId, payload) => {
    if (!teacherId) {
        throw new appError_1.AppError("Teacher ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        const assignment = await AssignmentModel_1.default.findById(assignmentId);
        if (!assignment) {
            throw new appError_1.AppError("Assignment not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        await checkTeacherCourseAccess(assignment.courseId.toString(), teacherId);
        Object.assign(assignment, payload);
        await assignment.save();
        return assignment;
    });
};
exports.updateAssignmentService = updateAssignmentService;
const deleteAssignmentService = async (assignmentId, teacherId) => {
    if (!teacherId) {
        throw new appError_1.AppError("Teacher ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        const assignment = await AssignmentModel_1.default.findById(assignmentId);
        if (!assignment) {
            throw new appError_1.AppError("Assignment not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        await checkTeacherCourseAccess(assignment.courseId.toString(), teacherId);
        await assignment.deleteOne();
        return assignment;
    });
};
exports.deleteAssignmentService = deleteAssignmentService;
