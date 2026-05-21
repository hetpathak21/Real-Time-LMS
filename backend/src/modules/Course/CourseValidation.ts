import { z } from "zod";

/* ---------------- CREATE COURSE ---------------- */

export const createCourseSchema = z.object({
  title: z.string().min(3, "Course title is required"),

  description: z.string().min(1, "Course description is required"),

  thumbnail: z.string().optional(),

  category: z.string().optional(),

  tags: z.array(z.string()).optional(),
});

/* ---------------- UPDATE COURSE ---------------- */

export const updateCourseSchema = z.object({
  title: z.string().min(3).optional(),

  description: z.string().optional(),

  thumbnail: z.string().optional(),

  category: z.string().optional(),

  tags: z.array(z.string()).optional(),
});

/* ---------------- COURSE ID ---------------- */

export const courseIdSchema = z.object({
  courseId: z.string().min(1),
});

/* ---------------- COURSE LIST QUERY ---------------- */

export const courseListSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional(),
});

export const createCourseValidationSchema = z.object({
  body: createCourseSchema,
});

export const updateCourseValidationSchema = z.object({
  body: updateCourseSchema,
  params: courseIdSchema,
});

export const courseIdValidationSchema = z.object({
  params: courseIdSchema,
});

export const courseListValidationSchema = z.object({
  query: courseListSchema,
});
