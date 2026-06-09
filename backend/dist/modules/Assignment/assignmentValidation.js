"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeSubmissionSchema = exports.submitAssignmentSchema = exports.assignmentIdParamSchema = exports.courseIdParamSchema = exports.publishAssignmentSchema = exports.updateAssignmentSchema = exports.createAssignmentSchema = void 0;
const zod_1 = require("zod");
const mongoId = zod_1.z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid id");
const assignmentBodySchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1, "Assignment title is required"),
    description: zod_1.z.string().trim().min(1, "Assignment description is required"),
    dueDate: zod_1.z.coerce.date({
        message: "Valid due date is required",
    }),
    totalMarks: zod_1.z.coerce.number().positive("Total marks must be positive"),
    attachmentUrl: zod_1.z.string().trim().url("Attachment URL must be valid").optional(),
    isPublished: zod_1.z.coerce.boolean().optional(),
});
exports.createAssignmentSchema = zod_1.z.object({
    params: zod_1.z.object({
        courseId: mongoId,
    }),
    body: assignmentBodySchema,
});
exports.updateAssignmentSchema = zod_1.z.object({
    params: zod_1.z.object({
        assignmentId: mongoId,
    }),
    body: assignmentBodySchema.partial().refine((value) => Object.keys(value).length > 0, "At least one field is required"),
});
exports.publishAssignmentSchema = zod_1.z.object({
    params: zod_1.z.object({
        assignmentId: mongoId,
    }),
    body: zod_1.z.object({
        isPublished: zod_1.z.coerce.boolean(),
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
exports.submitAssignmentSchema = zod_1.z.object({
    params: zod_1.z.object({
        assignmentId: mongoId,
    }),
    body: zod_1.z
        .object({
        textAnswer: zod_1.z.string().trim().optional(),
        fileUrl: zod_1.z.string().trim().url("Submission file URL must be valid").optional(),
    })
        .refine((value) => Boolean(value.textAnswer || value.fileUrl), "Text answer or file URL is required"),
});
exports.gradeSubmissionSchema = zod_1.z.object({
    params: zod_1.z.object({
        submissionId: mongoId,
    }),
    body: zod_1.z.object({
        grade: zod_1.z.coerce.number().min(0, "Grade cannot be negative"),
        feedback: zod_1.z.string().trim().optional(),
    }),
});
