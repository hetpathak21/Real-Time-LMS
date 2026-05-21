"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUpdateUserStatusValidationSchema = exports.adminUpdateUserValidationSchema = exports.adminUserIdValidationSchema = exports.adminUsersListValidationSchema = void 0;
const zod_1 = require("zod");
const userIdSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "User id is required"),
});
const userRoleSchema = zod_1.z.enum(["student", "teacher", "admin"]);
const userStatusSchema = zod_1.z.enum(["active", "blocked"]);
const adminUserListQuerySchema = zod_1.z.object({
    role: userRoleSchema.optional(),
    status: userStatusSchema.optional(),
    search: zod_1.z.string().trim().optional(),
    page: zod_1.z.coerce.number().min(1).optional(),
    limit: zod_1.z.coerce.number().min(1).max(100).optional(),
});
const updateUserSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2, "Name must be at least 2 characters").optional(),
    email: zod_1.z.string().trim().toLowerCase().email("Invalid email").optional(),
    role: userRoleSchema.optional(),
    avatar: zod_1.z.string().optional(),
    isVerified: zod_1.z.boolean().optional(),
})
    .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
});
const updateUserStatusSchema = zod_1.z.object({
    status: userStatusSchema,
});
exports.adminUsersListValidationSchema = zod_1.z.object({
    query: adminUserListQuerySchema,
});
exports.adminUserIdValidationSchema = zod_1.z.object({
    params: userIdSchema,
});
exports.adminUpdateUserValidationSchema = zod_1.z.object({
    params: userIdSchema,
    body: updateUserSchema,
});
exports.adminUpdateUserStatusValidationSchema = zod_1.z.object({
    params: userIdSchema,
    body: updateUserStatusSchema,
});
