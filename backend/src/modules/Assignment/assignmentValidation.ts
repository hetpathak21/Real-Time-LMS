import { z } from "zod";

const mongoId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid id");

export const createAssignmentSchema = z.object({
  params: z.object({
    courseId: mongoId,
  }),
  body: z.object({
    title: z.string().trim().min(1, "Assignment title is required"),
    description: z.string().optional(),
    attachments: z.array(z.string()).optional(),
    deadline: z.coerce.date({
      message: "Valid deadline is required",
    }),
    totalMarks: z.number().positive().optional(),
  }),
});

export const updateAssignmentSchema = z.object({
  params: z.object({
    assignmentId: mongoId,
  }),
  body: z.object({
    title: z.string().trim().min(1, "Assignment title cannot be empty").optional(),
    description: z.string().optional(),
    attachments: z.array(z.string()).optional(),
    deadline: z.coerce.date().optional(),
    totalMarks: z.number().positive().optional(),
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