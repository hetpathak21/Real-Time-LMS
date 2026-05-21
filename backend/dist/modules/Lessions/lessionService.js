"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLessonService = exports.updateLessonService = exports.getLessonByIdService = exports.getCourseLessonsService = exports.createLessonService = void 0;
const CourseModel_1 = __importDefault(require("../../models/CourseModel"));
const LessonModel_1 = __importDefault(require("../../models/LessonModel"));
const appError_1 = require("../../utils/appError");
const dbCall_1 = require("../../utils/dbCall");
const checkTeacherCourseAccess = async (courseId, teacherId) => {
    const course = await CourseModel_1.default.findOne({
        _id: courseId,
        teacherId,
    });
    if (!course) {
        throw new appError_1.AppError("Course not found or access denied", 404);
    }
    return course;
};
const createLessonService = async (courseId, teacherId, payload) => {
    return (0, dbCall_1.dbCall)(async () => {
        await checkTeacherCourseAccess(courseId, teacherId);
        const lesson = await LessonModel_1.default.create({
            ...payload,
            courseId,
        });
        return lesson;
    });
};
exports.createLessonService = createLessonService;
const getCourseLessonsService = async (courseId) => {
    return (0, dbCall_1.dbCall)(async () => {
        const course = await CourseModel_1.default.findById(courseId);
        if (!course) {
            throw new appError_1.AppError("Course not found", 404);
        }
        const lessons = await LessonModel_1.default.find({ courseId }).sort({
            order: 1,
            createdAt: 1,
        });
        return lessons;
    });
};
exports.getCourseLessonsService = getCourseLessonsService;
const getLessonByIdService = async (lessonId) => {
    return (0, dbCall_1.dbCall)(async () => {
        const lesson = await LessonModel_1.default.findById(lessonId).populate("courseId", "title teacherId isPublished");
        if (!lesson) {
            throw new appError_1.AppError("Lesson not found", 404);
        }
        return lesson;
    });
};
exports.getLessonByIdService = getLessonByIdService;
const updateLessonService = async (lessonId, teacherId, payload) => {
    return (0, dbCall_1.dbCall)(async () => {
        const lesson = await LessonModel_1.default.findById(lessonId);
        if (!lesson) {
            throw new appError_1.AppError("Lesson not found", 404);
        }
        await checkTeacherCourseAccess(lesson.courseId.toString(), teacherId);
        Object.assign(lesson, payload);
        await lesson.save();
        return lesson;
    });
};
exports.updateLessonService = updateLessonService;
const deleteLessonService = async (lessonId, teacherId) => {
    return (0, dbCall_1.dbCall)(async () => {
        const lesson = await LessonModel_1.default.findById(lessonId);
        if (!lesson) {
            throw new appError_1.AppError("Lesson not found", 404);
        }
        await checkTeacherCourseAccess(lesson.courseId.toString(), teacherId);
        await lesson.deleteOne();
        return lesson;
    });
};
exports.deleteLessonService = deleteLessonService;
