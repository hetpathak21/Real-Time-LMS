import { z } from "zod";

/* ---------------- PASSWORD ---------------- */
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
    message: "Must include number",
  })
  .refine((val) => /[@$!%*?&]/.test(val), {
    message: "Must include special character",
  });

/* ---------------- SIGNUP ---------------- */
export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name required"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email"),

  password: passwordSchema,

  role: z
    .enum(["student", "teacher", "admin"])
    .optional(),
});

/* ---------------- LOGIN ---------------- */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email"),

  password: z.string().min(6, "Password required"),
});

/* ---------------- REFRESH TOKEN ---------------- */
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

/* ---------------- UPDATE PROFILE ---------------- */
export const updateProfileSchema = z.object({
  name: z.string().trim().optional(),

  avatar: z.string().optional(),
});

/* ---------------- CHANGE PASSWORD ---------------- */
export const changePasswordSchema = z.object({
  oldPassword: z.string(),

  newPassword: passwordSchema,
});

export const signupValidationSchema = z.object({
  body: signupSchema,
});

export const loginValidationSchema = z.object({
  body: loginSchema,
});

export const refreshTokenValidationSchema = z.object({
  body: refreshTokenSchema,
});

export const updateProfileValidationSchema = z.object({
  body: updateProfileSchema,
});

export const changePasswordValidationSchema = z.object({
  body: changePasswordSchema,
});
