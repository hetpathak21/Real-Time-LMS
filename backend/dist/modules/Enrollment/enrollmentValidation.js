"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseIdWithQuerySchema = exports.enrollmentListQuerySchema = exports.courseIdParamSchema = void 0;
const zod_1 = require("zod");
exports.courseIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        courseId: zod_1.z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid course id"),
    }),
});
exports.enrollmentListQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z
            .string()
            .optional()
            .refine((value) => !value || Number(value) > 0, "Page must be a positive number"),
        limit: zod_1.z
            .string()
            .optional()
            .refine((value) => !value || Number(value) > 0, "Limit must be a positive number"),
    }),
});
exports.courseIdWithQuerySchema = zod_1.z.object({
    params: zod_1.z.object({
        courseId: zod_1.z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid course id"),
    }),
    query: zod_1.z.object({
        page: zod_1.z
            .string()
            .optional()
            .refine((value) => !value || Number(value) > 0, "Page must be a positive number"),
        limit: zod_1.z
            .string()
            .optional()
            .refine((value) => !value || Number(value) > 0, "Limit must be a positive number"),
    }),
});
