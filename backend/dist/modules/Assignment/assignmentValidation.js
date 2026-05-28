"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentIdParamSchema = exports.courseIdParamSchema = exports.updateAssignmentSchema = exports.createAssignmentSchema = void 0;
const zod_1 = require("zod");
const mongoId = zod_1.z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid id");
exports.createAssignmentSchema = zod_1.z.object({
    params: zod_1.z.object({
        courseId: mongoId,
    }),
    body: zod_1.z.object({
        title: zod_1.z.string().trim().min(1, "Assignment title is required"),
        description: zod_1.z.string().optional(),
        attachments: zod_1.z.array(zod_1.z.string()).optional(),
        deadline: zod_1.z.coerce.date({
            message: "Valid deadline is required",
        }),
        totalMarks: zod_1.z.number().positive().optional(),
    }),
});
exports.updateAssignmentSchema = zod_1.z.object({
    params: zod_1.z.object({
        assignmentId: mongoId,
    }),
    body: zod_1.z.object({
        title: zod_1.z.string().trim().min(1, "Assignment title cannot be empty").optional(),
        description: zod_1.z.string().optional(),
        attachments: zod_1.z.array(zod_1.z.string()).optional(),
        deadline: zod_1.z.coerce.date().optional(),
        totalMarks: zod_1.z.number().positive().optional(),
    }),
});
exports.courseIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        courseId: mongoId,
    }),
});
exports.assignmentIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        assignmentId: mongoId,
    }),
});
