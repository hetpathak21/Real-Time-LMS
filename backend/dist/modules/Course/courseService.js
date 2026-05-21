"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpublishCourseService = exports.publishCourseService = exports.deleteCourseService = exports.updateCourseService = exports.getCourseByIdService = exports.getPublishedCoursesService = exports.getMyCoursesService = exports.createCourseService = void 0;
const CourseModel_1 = __importDefault(require("../../models/CourseModel"));
const appError_1 = require("../../utils/appError");
const dbCall_1 = require("../../utils/dbCall");
const createCourseService = async (payload, teacherId) => {
    return (0, dbCall_1.dbCall)(async () => {
        const course = await CourseModel_1.default.create({
            ...payload,
            teacherId,
            isPublished: false,
        });
        return course;
    });
};
exports.createCourseService = createCourseService;
const getMyCoursesService = async (teacherId, query) => {
    return (0, dbCall_1.dbCall)(async () => {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        const filter = {
            teacherId,
        };
        if (query.search) {
            filter.title = { $regex: query.search, $options: "i" };
        }
        if (query.category) {
            filter.category = query.category;
        }
        const [courses, total] = await Promise.all([
            CourseModel_1.default.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            CourseModel_1.default.countDocuments(filter),
        ]);
        return {
            courses,
            meta: {
                page,
                limit,
                total,
            },
        };
    });
};
exports.getMyCoursesService = getMyCoursesService;
const getPublishedCoursesService = async (query) => {
    return (0, dbCall_1.dbCall)(async () => {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        const filter = {
            isPublished: true,
        };
        if (query.search) {
            filter.title = { $regex: query.search, $options: "i" };
        }
        if (query.category) {
            filter.category = query.category;
        }
        const [courses, total] = await Promise.all([
            CourseModel_1.default.find(filter)
                .populate("teacherId", "name email avatar")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            CourseModel_1.default.countDocuments(filter),
        ]);
        return {
            courses,
            meta: {
                page,
                limit,
                total,
            },
        };
    });
};
exports.getPublishedCoursesService = getPublishedCoursesService;
const getCourseByIdService = async (courseId) => {
    return (0, dbCall_1.dbCall)(async () => {
        const course = await CourseModel_1.default.findById(courseId)
            .populate("teacherId", "name email avatar");
        if (!course) {
            throw new appError_1.AppError("Course not found", 404);
        }
        return course;
    });
};
exports.getCourseByIdService = getCourseByIdService;
const updateCourseService = async (courseId, teacherId, payload) => {
    return (0, dbCall_1.dbCall)(async () => {
        const course = await CourseModel_1.default.findOne({
            _id: courseId,
            teacherId,
        });
        if (!course) {
            throw new appError_1.AppError("Course not found or access denied", 404);
        }
        Object.assign(course, payload);
        await course.save();
        return course;
    });
};
exports.updateCourseService = updateCourseService;
const deleteCourseService = async (courseId, teacherId) => {
    return (0, dbCall_1.dbCall)(async () => {
        const course = await CourseModel_1.default.findOneAndDelete({
            _id: courseId,
            teacherId,
        });
        if (!course) {
            throw new appError_1.AppError("Course not found or access denied", 404);
        }
        return course;
    });
};
exports.deleteCourseService = deleteCourseService;
const publishCourseService = async (courseId, teacherId) => {
    return (0, dbCall_1.dbCall)(async () => {
        const course = await CourseModel_1.default.findOne({
            _id: courseId,
            teacherId,
        });
        if (!course) {
            throw new appError_1.AppError("Course not found or access denied", 404);
        }
        course.isPublished = true;
        await course.save();
        return course;
    });
};
exports.publishCourseService = publishCourseService;
const unpublishCourseService = async (courseId, teacherId) => {
    return (0, dbCall_1.dbCall)(async () => {
        const course = await CourseModel_1.default.findOne({
            _id: courseId,
            teacherId,
        });
        if (!course) {
            throw new appError_1.AppError("Course not found or access denied", 404);
        }
        course.isPublished = false;
        await course.save();
        return course;
    });
};
exports.unpublishCourseService = unpublishCourseService;
