import { z } from "zod";

export const courseSchema = z.object({
  title: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Course title is required",
        });
        return;
      }

      if (val.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Course title must be at least 3 characters",
        });
      }
    }),

  description: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Description is required",
        });
        return;
      }

      if (val.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Description must be at least 10 characters",
        });
      }
    }),

  price: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Price is required",
        });
        return;
      }

      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Price must be a valid number",
        });
        return;
      }

      if (Number(val) < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Price must be non-negative",
        });
      }
    }),

  category: z.string().trim().optional().or(z.literal("")),

  level: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Please select a valid level",
  }),

  tags: z.string().trim().optional().or(z.literal("")),

  thumbnail: z
    .instanceof(File)
    .refine((file) => file.size <= 5242880, "Thumbnail must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Thumbnail must be JPEG, PNG",
    )
    .optional()
    .or(z.literal(null)),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
