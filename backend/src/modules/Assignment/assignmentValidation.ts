import { z } from "zod";

const mongoId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid id");

const assignmentBodySchema = z.object({
  title: z.string().trim().min(1, "Assignment title is required"),
  description: z.string().trim().min(1, "Assignment description is required"),
  dueDate: z.coerce.date({
    message: "Valid due date is required",
  }),
  totalMarks: z.coerce.number().positive("Total marks must be positive"),
  attachmentUrl: z.string().trim().url("Attachment URL must be valid").optional(),
  isPublished: z.coerce.boolean().optional(),
});

export const createAssignmentSchema = z.object({
  params: z.object({
    courseId: mongoId,
  }),
  body: assignmentBodySchema,
});

export const updateAssignmentSchema = z.object({
  params: z.object({
    assignmentId: mongoId,
  }),
  body: assignmentBodySchema.partial().refine(
    (value) => Object.keys(value).length > 0,
    "At least one field is required"
  ),
});

export const publishAssignmentSchema = z.object({
  params: z.object({
    assignmentId: mongoId,
  }),
  body: z.object({
    isPublished: z.coerce.boolean(),
  }),
});

export const courseIdParamSchema = z.object({
  params: z.object({
    courseId: mongoId,
  }),
});

export const assignmentIdParamSchema = z.object({
  params: z.object({
    assignmentId: mongoId,
  }),
});

export const submitAssignmentSchema = z.object({
  params: z.object({
    assignmentId: mongoId,
  }),
  body: z
    .object({
      textAnswer: z.string().trim().optional(),
      fileUrl: z.string().trim().url("Submission file URL must be valid").optional(),
    })
    .refine(
      (value) => Boolean(value.textAnswer || value.fileUrl),
      "Text answer or file URL is required"
    ),
});

export const gradeSubmissionSchema = z.object({
  params: z.object({
    submissionId: mongoId,
  }),
  body: z.object({
    grade: z.coerce.number().min(0, "Grade cannot be negative"),
    feedback: z.string().trim().optional(),
  }),
});
