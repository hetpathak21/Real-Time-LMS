import { RootState } from "../../app/store";

/**
 * All notifications
 */
export const selectNotifications = (state: RootState) =>
  state.notification.notifications;

/**
 * Unread count
 */
export const selectUnreadNotificationCount = (state: RootState) =>
  state.notification.unreadCount;

/**
 * Loading state
 */
export const selectNotificationLoading = (state: RootState) =>
  state.notification.loading;

/**
 * Error state
 */
export const selectNotificationError = (state: RootState) =>
  state.notification.error;

/**
 * Get notification by ID
 */
export const selectNotificationById =
  (id: string) => (state: RootState) =>
    state.notification.notifications.find((n) => n._id === id) || null;