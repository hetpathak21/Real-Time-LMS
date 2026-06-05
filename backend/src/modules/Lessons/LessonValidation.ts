import { z } from "zod";

const lessonTypeSchema = z.enum(["video", "pdf", "text", "document", "link"]);
const booleanField = z.preprocess((value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}, z.boolean());

/* ---------------- CREATE LESSON ---------------- */
export const createLessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  type: lessonTypeSchema,

  contentUrl: z.string().optional(),
  textContent: z.string().optional(),
  fileName: z.string().optional(),
  mimeType: z.string().optional(),

  order: z.coerce.number().optional(),

  duration: z.coerce.number().optional(),

  isPreview: booleanField.optional(),
});

/* ---------------- UPDATE LESSON ---------------- */
export const updateLessonSchema = z.object({
  title: z.string().min(1, "Lesson title cannot be empty").optional(),
  type: lessonTypeSchema.optional(),

  contentUrl: z.string().optional(),
  textContent: z.string().optional(),
  fileName: z.string().optional(),
  mimeType: z.string().optional(),

  order: z.coerce.number().optional(),

  duration: z.coerce.number().optional(),

  isPreview: booleanField.optional(),
});

/* ---------------- IDS ---------------- */
export const courseIdSchema = z.object({
  courseId: z.string().min(1, "Invalid course id"),
});

export const lessonIdSchema = z.object({
  lessonId: z.string().min(1, "Invalid lesson id"),
});

export const createLessonValidationSchema = z.object({
  body: createLessonSchema,
  params: courseIdSchema,
});

export const updateLessonValidationSchema = z.object({
  body: updateLessonSchema,
  params: lessonIdSchema,
});

export const courseLessonIdValidationSchema = z.object({
  params: courseIdSchema,
});

export const lessonIdValidationSchema = z.object({
  params: lessonIdSchema,
});
