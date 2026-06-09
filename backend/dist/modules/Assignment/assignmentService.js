"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeSubmissionService = exports.getAssignmentSubmissionsService = exports.submitAssignmentService = exports.setAssignmentPublishStatusService = exports.deleteAssignmentService = exports.updateAssignmentService = exports.getAssignmentByIdService = exports.getCourseAssignmentsService = exports.createAssignmentService = void 0;
const AssignmentModel_1 = __importDefault(require("../../models/AssignmentModel"));
const CourseModel_1 = __importDefault(require("../../models/CourseModel"));
const EnrollmentModel_1 = __importDefault(require("../../models/EnrollmentModel"));
const SubmissionModel_1 = __importDefault(require("../../models/SubmissionModel"));
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
const checkStudentEnrollment = async (courseId, studentId) => {
    const enrollment = await EnrollmentModel_1.default.findOne({
        courseId,
        studentId,
    });
    if (!enrollment) {
        throw new appError_1.AppError("Enrollment required to access this assignment", StatusCodes_1.STATUS_CODES.FORBIDDEN);
    }
    return enrollment;
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
            teacherId,
            isPublished: payload.isPublished ?? false,
        });
        return assignment;
    });
};
exports.createAssignmentService = createAssignmentService;
const getCourseAssignmentsService = async (courseId, viewer) => {
    return (0, dbCall_1.dbCall)(async () => {
        const course = await CourseModel_1.default.findById(courseId);
        if (!course) {
            throw new appError_1.AppError("Course not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        const filter = { courseId };
        if (viewer.role === "teacher") {
            await checkTeacherCourseAccess(courseId, viewer.userId);
        }
        if (viewer.role === "student") {
            await checkStudentEnrollment(courseId, viewer.userId);
            filter.isPublished = true;
        }
        const assignments = await AssignmentModel_1.default.find(filter)
            .populate("teacherId", "name email avatar")
            .sort({ dueDate: 1, createdAt: -1 });
        return assignments;
    });
};
exports.getCourseAssignmentsService = getCourseAssignmentsService;
const getAssignmentByIdService = async (assignmentId, viewer) => {
    return (0, dbCall_1.dbCall)(async () => {
        const assignment = await AssignmentModel_1.default.findById(assignmentId);
        if (!assignment) {
            throw new appError_1.AppError("Assignment not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        if (viewer.role === "teacher") {
            await checkTeacherCourseAccess(assignment.courseId.toString(), viewer.userId);
        }
        if (viewer.role === "student") {
            if (!assignment.isPublished) {
                throw new appError_1.AppError("Assignment not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
            }
            await checkStudentEnrollment(assignment.courseId.toString(), viewer.userId);
        }
        await assignment.populate("courseId", "title teacherId isPublished");
        await assignment.populate("teacherId", "name email avatar");
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
const setAssignmentPublishStatusService = async (assignmentId, teacherId, isPublished) => {
    if (!teacherId) {
        throw new appError_1.AppError("Teacher ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        const assignment = await AssignmentModel_1.default.findById(assignmentId);
        if (!assignment) {
            throw new appError_1.AppError("Assignment not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        await checkTeacherCourseAccess(assignment.courseId.toString(), teacherId);
        assignment.isPublished = isPublished;
        await assignment.save();
        return assignment;
    });
};
exports.setAssignmentPublishStatusService = setAssignmentPublishStatusService;
const submitAssignmentService = async (assignmentId, studentId, payload) => {
    if (!studentId) {
        throw new appError_1.AppError("Student ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        const assignment = await AssignmentModel_1.default.findById(assignmentId);
        if (!assignment || !assignment.isPublished) {
            throw new appError_1.AppError("Assignment not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        await checkStudentEnrollment(assignment.courseId.toString(), studentId);
        const existingSubmission = await SubmissionModel_1.default.findOne({
            assignmentId,
            studentId,
        });
        if (existingSubmission) {
            throw new appError_1.AppError("Assignment already submitted", StatusCodes_1.STATUS_CODES.CONFLICT);
        }
        const submission = await SubmissionModel_1.default.create({
            assignmentId,
            studentId,
            textAnswer: payload.textAnswer,
            fileUrl: payload.fileUrl,
            status: "submitted",
            submittedAt: new Date(),
        });
        return submission;
    });
};
exports.submitAssignmentService = submitAssignmentService;
const getAssignmentSubmissionsService = async (assignmentId, teacherId) => {
    if (!teacherId) {
        throw new appError_1.AppError("Teacher ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        const assignment = await AssignmentModel_1.default.findById(assignmentId);
        if (!assignment) {
            throw new appError_1.AppError("Assignment not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        await checkTeacherCourseAccess(assignment.courseId.toString(), teacherId);
        const submissions = await SubmissionModel_1.default.find({ assignmentId })
            .populate("studentId", "name email avatar")
            .sort({ submittedAt: -1 });
        return submissions;
    });
};
exports.getAssignmentSubmissionsService = getAssignmentSubmissionsService;
const gradeSubmissionService = async (submissionId, teacherId, payload) => {
    if (!teacherId) {
        throw new appError_1.AppError("Teacher ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        const submission = await SubmissionModel_1.default.findById(submissionId);
        if (!submission) {
            throw new appError_1.AppError("Submission not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        const assignment = await AssignmentModel_1.default.findById(submission.assignmentId);
        if (!assignment) {
            throw new appError_1.AppError("Assignment not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        await checkTeacherCourseAccess(assignment.courseId.toString(), teacherId);
        if (payload.grade > assignment.totalMarks) {
            throw new appError_1.AppError("Grade cannot exceed assignment total marks", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
        }
        submission.grade = payload.grade;
        submission.feedback = payload.feedback;
        submission.status = "graded";
        await submission.save();
        return submission;
    });
};
exports.gradeSubmissionService = gradeSubmissionService;
