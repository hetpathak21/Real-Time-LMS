// src/features/lesson/lessonSchema.ts
import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().min(3, "Lesson title must be at least 3 characters long"),
  type: z.enum(["video", "pdf", "document", "text", "link"]),
  duration: z.coerce.number().min(0, "Duration must be a positive number"),
  order: z.coerce.number().int().min(0, "Order sequence must be an integer"),
  isPreview: z.boolean().default(false),
  contentUrl: z.string().optional(),
  textContent: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type === "text" && (!data.textContent || data.textContent.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Reading body content text cannot be empty",
      path: ["textContent"],
    });
  }
  if (
    data.type === "link" &&
    (!data.contentUrl || !data.contentUrl.startsWith("http"))
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "A valid external destination URL is required",
      path: ["contentUrl"],
    });
  }
});

export type LessonFormInput = z.input<typeof lessonSchema>;
export type LessonFormValues = z.output<typeof lessonSchema>;

export const COLORS = {
  primary: "#0ea5e9",
  primaryHover: "#0284c7",
  bgLight: "#f8fafc",
  cardBg: "#ffffff",
  textMain: "#0f172a",
  textSub: "#64748b",
  border: "#e2e8f0",
};
