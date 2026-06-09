import { Response } from "express";
import { AuthRequest } from "../../middleware/AuthMiddleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { AppError } from "../../utils/appError";
import { STATUS_CODES } from "../../constants/StatusCodes";
import {
  createNotificationService,
  deleteNotificationService,
  getMyNotificationsService,
  getNotificationByIdService,
  getNotificationsService,
  markAllNotificationsReadService,
  markNotificationReadService,
  updateNotificationService,
} from "./notificationService";
import { NotificationQuery, NotificationViewer } from "./notificationTypes";

const getViewer = (req: AuthRequest): NotificationViewer => {
  const userId = req.user?.userId;
  const role = req.user?.role;

  if (!userId || !role) {
    throw new AppError("Unauthorized user", STATUS_CODES.UNAUTHORIZED);
  }

  if (role !== "student" && role !== "teacher" && role !== "admin") {
    throw new AppError(
      "Access denied: insufficient permissions",
      STATUS_CODES.FORBIDDEN
    );
  }

  return { userId, role };
};

export const createNotification = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const notification = await createNotificationService(req.body);

    return sendResponse(
      res,
      STATUS_CODES.CREATED,
      true,
      "Notification created successfully",
      notification
    );
  }
);

export const getNotifications = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const viewer = getViewer(req);
    const result = await getNotificationsService(
      viewer,
      req.query as NotificationQuery
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Notifications fetched successfully",
      result
    );
  }
);

export const getMyNotifications = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const viewer = getViewer(req);
    const result = await getMyNotificationsService(
      viewer.userId,
      req.query as NotificationQuery
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Notifications fetched successfully",
      result
    );
  }
);

export const getNotificationById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const viewer = getViewer(req);
    const { notificationId } = req.params as { notificationId: string };
    const notification = await getNotificationByIdService(notificationId, viewer);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Notification fetched successfully",
      notification
    );
  }
);

export const updateNotification = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const viewer = getViewer(req);
    const { notificationId } = req.params as { notificationId: string };
    const notification = await updateNotificationService(
      notificationId,
      viewer,
      req.body
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Notification updated successfully",
      notification
    );
  }
);

export const markNotificationAsRead = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const viewer = getViewer(req);
    const { notificationId } = req.params as { notificationId: string };
    const notification = await markNotificationReadService(notificationId, viewer);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Notification marked as read",
      notification
    );
  }
);

export const markAllNotificationsAsRead = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const viewer = getViewer(req);
    const result = await markAllNotificationsReadService(viewer.userId);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "All notifications marked as read",
      result
    );
  }
);

export const deleteNotification = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const viewer = getViewer(req);
    const { notificationId } = req.params as { notificationId: string };

    await deleteNotificationService(notificationId, viewer);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Notification deleted successfully"
    );
  }
);
