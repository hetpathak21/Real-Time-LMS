"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.updateProfileSchema = exports.refreshTokenSchema = exports.loginSchema = exports.signupSchema = exports.passwordSchema = void 0;
const zod_1 = require("zod");
/* ---------------- PASSWORD ---------------- */
exports.passwordSchema = zod_1.z
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
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, "Name required"),
    email: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email"),
    password: exports.passwordSchema,
    role: zod_1.z
        .enum(["student", "teacher", "admin"])
        .optional(),
});
/* ---------------- LOGIN ---------------- */
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email"),
    password: zod_1.z.string().min(6, "Password required"),
});
/* ---------------- REFRESH TOKEN ---------------- */
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1),
});
/* ---------------- UPDATE PROFILE ---------------- */
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().trim().optional(),
    avatar: zod_1.z.string().optional(),
});
/* ---------------- CHANGE PASSWORD ---------------- */
exports.changePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string(),
    newPassword: exports.passwordSchema,
});
