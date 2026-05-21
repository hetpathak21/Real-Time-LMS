"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseListValidationSchema = exports.courseIdValidationSchema = exports.updateCourseValidationSchema = exports.createCourseValidationSchema = exports.courseListSchema = exports.courseIdSchema = exports.updateCourseSchema = exports.createCourseSchema = void 0;
const zod_1 = require("zod");
/* ---------------- CREATE COURSE ---------------- */
exports.createCourseSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Course title is required"),
    description: zod_1.z.string().min(1, "Course description is required"),
    thumbnail: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
/* ---------------- UPDATE COURSE ---------------- */
exports.updateCourseSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).optional(),
    description: zod_1.z.string().optional(),
    thumbnail: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
/* ---------------- COURSE ID ---------------- */
exports.courseIdSchema = zod_1.z.object({
    courseId: zod_1.z.string().min(1),
});
/* ---------------- COURSE LIST QUERY ---------------- */
exports.courseListSchema = zod_1.z.object({
    search: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    page: zod_1.z.coerce.number().min(1).optional(),
    limit: zod_1.z.coerce.number().min(1).optional(),
});
exports.createCourseValidationSchema = zod_1.z.object({
    body: exports.createCourseSchema,
});
exports.updateCourseValidationSchema = zod_1.z.object({
    body: exports.updateCourseSchema,
    params: exports.courseIdSchema,
});
exports.courseIdValidationSchema = zod_1.z.object({
    params: exports.courseIdSchema,
});
exports.courseListValidationSchema = zod_1.z.object({
    query: exports.courseListSchema,
});
