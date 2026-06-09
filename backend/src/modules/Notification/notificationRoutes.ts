import { Router } from "express";

import {
  createNotification,
  deleteNotification,
  getMyNotifications,
  getNotificationById,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  updateNotification,
} from "./notificationController";

import {
  createNotificationSchema,
  notificationIdParamSchema,
  notificationQuerySchema,
  updateNotificationSchema,
} from "./notificationValidation";

import { authMiddleware } from "../../middleware/AuthMiddleware";
import { authorizeRoles } from "../../middleware/RoleMiddleware";
import { validateRequest } from "../../middleware/ValiateMiddleware";

const router = Router();

/* ======================================================
   COMMON ACCESS ROLES
====================================================== */

const allAuthorizedRoles = ["student", "teacher", "admin"] as const;

/* ======================================================
   CREATE NOTIFICATION
====================================================== */

router.post(
  "/",
  authMiddleware,
  authorizeRoles("teacher", "admin"),
  validateRequest(createNotificationSchema),
  createNotification
);

/* ======================================================
   GET ALL NOTIFICATIONS
====================================================== */

router.get(
  "/",
  authMiddleware,
  authorizeRoles(...allAuthorizedRoles),
  validateRequest(notificationQuerySchema),
  getNotifications
);

/* ======================================================
   GET MY NOTIFICATIONS
====================================================== */

router.get(
  "/me",
  authMiddleware,
  authorizeRoles(...allAuthorizedRoles),
  validateRequest(notificationQuerySchema),
  getMyNotifications
);

/* ======================================================
   MARK ALL AS READ
====================================================== */

router.patch(
  "/read-all",
  authMiddleware,
  authorizeRoles(...allAuthorizedRoles),
  markAllNotificationsAsRead
);

/* ======================================================
   GET SINGLE NOTIFICATION
====================================================== */

router.get(
  "/:notificationId",
  authMiddleware,
  authorizeRoles(...allAuthorizedRoles),
  validateRequest(notificationIdParamSchema),
  getNotificationById
);

/* ======================================================
   UPDATE NOTIFICATION
====================================================== */

router.patch(
  "/:notificationId",
  authMiddleware,
  authorizeRoles(...allAuthorizedRoles),
  validateRequest(updateNotificationSchema),
  updateNotification
);

/* ======================================================
   MARK SINGLE NOTIFICATION AS READ
====================================================== */

router.patch(
  "/:notificationId/read",
  authMiddleware,
  authorizeRoles(...allAuthorizedRoles),
  validateRequest(notificationIdParamSchema),
  markNotificationAsRead
);

/* ======================================================
   DELETE NOTIFICATION
====================================================== */

router.delete(
  "/:notificationId",
  authMiddleware,
  authorizeRoles(...allAuthorizedRoles),
  validateRequest(notificationIdParamSchema),
  deleteNotification
);

export default router;