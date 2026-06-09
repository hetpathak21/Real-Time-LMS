import { Types } from "mongoose";

export const notificationTypes = [
  "assignment",
  "grade",
  "system",
  "enrollment",
] as const;

export type NotificationType = (typeof notificationTypes)[number];

export type NotificationStatus = "read" | "unread";

export interface CreateNotificationPayload {
  userId?: string | Types.ObjectId;
  recipient?: string | Types.ObjectId;
  title?: string;
  message: string;
  type: NotificationType;
  isRead?: boolean;
  status?: NotificationStatus;
}

export interface UpdateNotificationPayload {
  title?: string;
  message?: string;
  type?: NotificationType;
  isRead?: boolean;
  status?: NotificationStatus;
}

export interface NotificationQuery {
  page?: string | number;
  limit?: string | number;
  type?: NotificationType;
  isRead?: string | boolean;
  status?: NotificationStatus;
  userId?: string;
  recipient?: string;
}

export interface NotificationViewer {
  userId: string;
  role: "student" | "teacher" | "admin";
}

export interface NotificationListResult<T> {
  notifications: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    unreadCount: number;
  };
}
