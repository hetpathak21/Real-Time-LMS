"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseStudentsService = exports.updateLastAccessedService = exports.getEnrollmentProgressService = exports.getMyEnrolledCoursesService = exports.enrollCourseService = void 0;
const CourseModel_1 = __importDefault(require("../../models/CourseModel"));
const EnrollmentModel_1 = __importDefault(require("../../models/EnrollmentModel"));
const appError_1 = require("../../utils/appError");
const dbCall_1 = require("../../utils/dbCall");
const StatusCodes_1 = require("../../constants/StatusCodes");
const enrollCourseService = async (courseId, studentId) => {
    if (!studentId) {
        throw new appError_1.AppError("Student ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        const course = await CourseModel_1.default.findById(courseId);
        if (!course) {
            throw new appError_1.AppError("Course not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        if (!course.isPublished) {
            throw new appError_1.AppError("You can only enroll in published courses", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
        }
        const existingEnrollment = await EnrollmentModel_1.default.findOne({
            courseId,
            studentId,
        });
        if (existingEnrollment) {
            throw new appError_1.AppError("You are already enrolled in this course", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
        }
        const enrollment = await EnrollmentModel_1.default.create({
            courseId,
            studentId,
            progress: 0,
            completed: false,
            lastAccessedAt: new Date(),
        });
        await CourseModel_1.default.findByIdAndUpdate(courseId, {
            $inc: { enrollmentCount: 1 },
        });
        return enrollment;
    });
};
exports.enrollCourseService = enrollCourseService;
const getMyEnrolledCoursesService = async (studentId, query) => {
    if (!studentId) {
        throw new appError_1.AppError("Student ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        const filter = { studentId };
        const [enrollments, total] = await Promise.all([
            EnrollmentModel_1.default.find(filter)
                .populate("courseId", "title description thumbnail category tags teacherId enrollmentCount")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            EnrollmentModel_1.default.countDocuments(filter),
        ]);
        return {
            enrollments,
            meta: {
                page,
                limit,
                total,
            },
        };
    });
};
exports.getMyEnrolledCoursesService = getMyEnrolledCoursesService;
const getEnrollmentProgressService = async (courseId, studentId) => {
    if (!studentId) {
        throw new appError_1.AppError("Student ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        const enrollment = await EnrollmentModel_1.default.findOne({
            courseId,
            studentId,
        }).populate("courseId", "title thumbnail");
        if (!enrollment) {
            throw new appError_1.AppError("Enrollment not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        return enrollment;
    });
};
exports.getEnrollmentProgressService = getEnrollmentProgressService;
const updateLastAccessedService = async (courseId, studentId) => {
    if (!studentId) {
        throw new appError_1.AppError("Student ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        const enrollment = await EnrollmentModel_1.default.findOneAndUpdate({
            courseId,
            studentId,
        }, {
            lastAccessedAt: new Date(),
        }, {
            new: true,
        });
        if (!enrollment) {
            throw new appError_1.AppError("Enrollment not found", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        return enrollment;
    });
};
exports.updateLastAccessedService = updateLastAccessedService;
const getCourseStudentsService = async (courseId, teacherId, query) => {
    if (!teacherId) {
        throw new appError_1.AppError("Teacher ID is required", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
    }
    return (0, dbCall_1.dbCall)(async () => {
        const course = await CourseModel_1.default.findOne({
            _id: courseId,
            teacherId,
        });
        if (!course) {
            throw new appError_1.AppError("Course not found or access denied", StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        const filter = { courseId };
        const [students, total] = await Promise.all([
            EnrollmentModel_1.default.find(filter)
                .populate("studentId", "name email avatar")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            EnrollmentModel_1.default.countDocuments(filter),
        ]);
        return {
            students,
            meta: {
                page,
                limit,
                total,
            },
        };
    });
};
exports.getCourseStudentsService = getCourseStudentsService;
