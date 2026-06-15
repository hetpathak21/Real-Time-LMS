import { z } from "zod";
import { notificationTypes } from "./notificationTypes";

const mongoId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid id");

const statusSchema = z.enum(["read", "unread"]);

/* ======================================================
   BASE BODY SCHEMA
====================================================== */

const notificationBodyBaseSchema = z.object({
  userId: mongoId.optional(),
  recipient: mongoId.optional(),

  title: z
    .string()
    .trim()
    .min(1, "Title cannot be empty")
    .optional(),

  message: z
    .string()
    .trim()
    .min(1, "Notification message is required"),

  type: z.enum(notificationTypes),

  isRead: z.coerce.boolean().optional(),

  status: statusSchema.optional(),
});

/* ======================================================
   CREATE NOTIFICATION BODY
====================================================== */

const notificationBodySchema = notificationBodyBaseSchema.refine(
  (value) => Boolean(value.userId || value.recipient),
  {
    message: "Recipient is required",
    path: ["recipient"],
  }
);

/* ======================================================
   QUERY VALIDATION
====================================================== */

const notificationQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),

    limit: z.coerce.number().int().positive().max(100).optional(),

    type: z.enum(notificationTypes).optional(),

    isRead: z.coerce.boolean().optional(),

    status: statusSchema.optional(),

    userId: mongoId.optional(),

    recipient: mongoId.optional(),
  }),
});

/* ======================================================
   PARAM VALIDATION
====================================================== */

const notificationIdParamSchema = z.object({
  params: z.object({
    notificationId: mongoId,
  }),
});

/* ======================================================
   CREATE VALIDATION
====================================================== */

const createNotificationSchema = z.object({
  body: notificationBodySchema,
});

/* ======================================================
   UPDATE BODY BASE
====================================================== */

const updateNotificationBodySchema =
  notificationBodyBaseSchema
    .omit({
      userId: true,
      recipient: true,
    })
    .partial();

/* ======================================================
   UPDATE VALIDATION
====================================================== */

const updateNotificationSchema = z.object({
  params: z.object({
    notificationId: mongoId,
  }),

  body: updateNotificationBodySchema.refine(
    (value) => Object.keys(value).length > 0,
    {
      message: "At least one field is required",
    }
  ),
});

/* ======================================================
   EXPORTS
====================================================== */

export {
  createNotificationSchema,
  updateNotificationSchema,
  notificationQuerySchema,
  notificationIdParamSchema,
};