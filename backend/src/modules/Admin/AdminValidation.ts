import { z } from "zod";

const userIdSchema = z.object({
  userId: z.string().min(1, "User id is required"),
});

const userRoleSchema = z.enum(["student", "teacher", "admin"]);
const userStatusSchema = z.enum(["active", "blocked"]);

const adminUserListQuerySchema = z.object({
  role: userRoleSchema.optional(),
  status: userStatusSchema.optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
});

const updateUserSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().trim().toLowerCase().email("Invalid email").optional(),
    role: userRoleSchema.optional(),
    avatar: z.string().optional(),
    isVerified: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

const updateUserStatusSchema = z.object({
  status: userStatusSchema,
});

export const adminUsersListValidationSchema = z.object({
  query: adminUserListQuerySchema,
});

export const adminUserIdValidationSchema = z.object({
  params: userIdSchema,
});

export const adminUpdateUserValidationSchema = z.object({
  params: userIdSchema,
  body: updateUserSchema,
});

export const adminUpdateUserStatusValidationSchema = z.object({
  params: userIdSchema,
  body: updateUserStatusSchema,
});
