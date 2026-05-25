import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .refine((value) => /[a-z]/.test(value), {
    message: "Must include lowercase letter",
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Must include uppercase letter",
  })
  .refine((value) => /\d/.test(value), {
    message: "Must include number",
  })
  .refine((value) => /[@$!%*?&]/.test(value), {
    message: "Must include special character",
  });

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email"),
  password: z.string().min(6, "Password required"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name required"),
  email: z.string().trim().toLowerCase().email("Invalid email"),
  password: passwordSchema,
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  avatar: z.string().trim().url("Avatar must be a valid URL").or(z.literal("")),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
