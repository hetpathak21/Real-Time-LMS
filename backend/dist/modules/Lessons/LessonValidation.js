"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonIdValidationSchema = exports.courseLessonIdValidationSchema = exports.updateLessonValidationSchema = exports.createLessonValidationSchema = exports.lessonIdSchema = exports.courseIdSchema = exports.updateLessonSchema = exports.createLessonSchema = void 0;
const zod_1 = require("zod");
const lessonTypeSchema = zod_1.z.enum(["video", "pdf", "text", "link"]);
/* ---------------- CREATE LESSON ---------------- */
exports.createLessonSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Lesson title is required"),
    type: lessonTypeSchema,
    contentUrl: zod_1.z.string().optional(),
    order: zod_1.z.coerce.number().optional(),
    duration: zod_1.z.coerce.number().optional(),
    isPreview: zod_1.z.boolean().optional(),
});
/* ---------------- UPDATE LESSON ---------------- */
exports.updateLessonSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Lesson title cannot be empty").optional(),
    type: lessonTypeSchema.optional(),
    contentUrl: zod_1.z.string().optional(),
    order: zod_1.z.coerce.number().optional(),
    duration: zod_1.z.coerce.number().optional(),
    isPreview: zod_1.z.boolean().optional(),
});
/* ---------------- IDS ---------------- */
exports.courseIdSchema = zod_1.z.object({
    courseId: zod_1.z.string().min(1, "Invalid course id"),
});
exports.lessonIdSchema = zod_1.z.object({
    lessonId: zod_1.z.string().min(1, "Invalid lesson id"),
});
exports.createLessonValidationSchema = zod_1.z.object({
    body: exports.createLessonSchema,
    params: exports.courseIdSchema,
});
exports.updateLessonValidationSchema = zod_1.z.object({
    body: exports.updateLessonSchema,
    params: exports.lessonIdSchema,
});
exports.courseLessonIdValidationSchema = zod_1.z.object({
    params: exports.courseIdSchema,
});
exports.lessonIdValidationSchema = zod_1.z.object({
    params: exports.lessonIdSchema,
});
