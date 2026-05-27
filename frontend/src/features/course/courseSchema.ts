import { z } from "zod";

export const courseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Course title must be at least 3 characters")
    .max(100, "Course title must not exceed 100 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  category: z
    .string()
    .trim()
    .min(2, "Category must be at least 2 characters")
    .optional()
    .or(z.literal("")),
  level: z
    .enum(["beginner", "intermediate", "advanced"], {
      errorMap: () => ({ message: "Please select a valid level" }),
    })
    .default("beginner"),
  price: z
    .union([
      z.number().nonnegative("Price must be a non-negative number"),
      z
        .string()
        .trim()
        .refine((val) => val === "" || !isNaN(parseFloat(val)), {
          message: "Price must be a valid number",
        })
        .refine((val) => val === "" || parseFloat(val) >= 0, {
          message: "Price must be non-negative",
        })
        .transform((val) => (val === "" ? 0 : parseFloat(val))),
    ])
    .default(0),
  tags: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  thumbnail: z
    .instanceof(File)
    .refine((file) => file.size <= 5242880, "Thumbnail must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Thumbnail must be JPEG, PNG, or WebP"
    )
    .optional()
    .or(z.literal(null)),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
