import { z } from "zod";

export const courseIdParamSchema = z.object({
  params: z.object({
    courseId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid course id"),
  }),
});

export const enrollmentListQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .refine(
        (value) => !value || Number(value) > 0,
        "Page must be a positive number"
      ),

    limit: z
      .string()
      .optional()
      .refine(
        (value) => !value || Number(value) > 0,
        "Limit must be a positive number"
      ),
  }),
});

export const courseIdWithQuerySchema = z.object({
  params: z.object({
    courseId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid course id"),
  }),

  query: z.object({
    page: z
      .string()
      .optional()
      .refine(
        (value) => !value || Number(value) > 0,
        "Page must be a positive number"
      ),

    limit: z
      .string()
      .optional()
      .refine(
        (value) => !value || Number(value) > 0,
        "Limit must be a positive number"
      ),
  }),
});