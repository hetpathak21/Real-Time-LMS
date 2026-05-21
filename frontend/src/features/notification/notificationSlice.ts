import { createSlice } from "@reduxjs/toolkit";
import { INotification } from "../../types/notificationTypes";

import {
  fetchNotifications,
  markNotificationAsReadThunk,
  markAllNotificationsReadThunk,
  deleteNotificationThunk,
} from "./notificationThunks";

interface NotificationState {
  notifications: INotification[];
  unreadCount: number;

  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,

  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    /**
     * Real-time socket push handler (used from socket listener)
     */
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },

    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },

  extraReducers: (builder) => {
    //  Get all notifications
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.notifications = action.payload;

      state.unreadCount = action.payload.filter(
        (n) => n.status === "unread",
      ).length;
    });

    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //  Mark single notification as read
    builder.addCase(markNotificationAsReadThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.notifications = state.notifications.map((n) =>
        n._id === updated._id ? updated : n,
      );

      state.unreadCount = state.notifications.filter(
        (n) => n.status === "unread",
      ).length;
    });

    // Mark all as read
    builder.addCase(markAllNotificationsReadThunk.fulfilled, (state) => {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        status: "read",
      }));

      state.unreadCount = 0;
    });

    //  Delete notification
    builder.addCase(deleteNotificationThunk.fulfilled, (state, action) => {
      const id = action.payload;

      state.notifications = state.notifications.filter((n) => n._id !== id);

      state.unreadCount = state.notifications.filter(
        (n) => n.status === "unread",
      ).length;
    });
  },
});

export const { addNotification, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
