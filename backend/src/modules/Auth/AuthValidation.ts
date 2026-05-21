import { z } from "zod";

/* ---------------- PASSWORD VALIDATION ---------------- */
export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .refine((val) => /[a-z]/.test(val), {
    message: "Must include lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Must include uppercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "Must include a number",
  })
  .refine((val) => /[@$!%*?&]/.test(val), {
    message: "Must include special character (@$!%*?&)",
  });

/* ---------------- REGISTER ---------------- */
export const registerSchema = z.object({
  first_name: z.string().trim().min(2, "First name required"),
  last_name: z.string().trim().min(2, "Last name required"),
  email: z.string().trim().toLowerCase().email("Invalid email"),
  password: passwordSchema,
  phone_number: z.string().trim().optional(),
});

/* ---------------- LOGIN ---------------- */
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email"),
  password: z.string().min(6, "Password required"),
});

/* ---------------- FORGOT PASSWORD ---------------- */
export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email"),
});

/* ---------------- RESET PASSWORD ---------------- */
export const resetPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email"),
  newPassword: passwordSchema,
});