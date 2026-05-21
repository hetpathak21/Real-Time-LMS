import axiosInstance from "./axiosInstance";
import {
  INotification,
  ICreateNotificationPayload,
  INotificationQuery,
  INotificationDetails,
} from "../types/notificationTypes";

/**
 * Create notification (system/internal usage)
 */
export const createNotification = async (
  data: ICreateNotificationPayload
): Promise<INotification> => {
  const res = await axiosInstance.post("/notifications", data);
  return res.data;
};

/**
 * Get all notifications (user-specific)
 */
export const getNotifications = async (
  query?: INotificationQuery
): Promise<INotification[]> => {
  const res = await axiosInstance.get("/notifications", {
    params: query,
  });
  return res.data;
};

/**
 * Get notification by ID
 */
export const getNotificationById = async (
  notificationId: string
): Promise<INotificationDetails> => {
  const res = await axiosInstance.get(
    `/notifications/${notificationId}`
  );
  return res.data;
};

/**
 * Get my notifications (logged-in user)
 */
export const getMyNotifications = async (): Promise<INotification[]> => {
  const res = await axiosInstance.get("/notifications/me");
  return res.data;
};

/**
 * Mark notification as read
 */
export const markAsRead = async (
  notificationId: string
): Promise<INotification> => {
  const res = await axiosInstance.patch(
    `/notifications/${notificationId}/read`
  );
  return res.data;
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async (): Promise<void> => {
  await axiosInstance.patch("/notifications/read-all");
};

/**
 * Delete notification
 */
export const deleteNotification = async (
  notificationId: string
): Promise<void> => {
  await axiosInstance.delete(`/notifications/${notificationId}`);
};