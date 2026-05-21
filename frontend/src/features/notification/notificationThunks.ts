import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../../api/notificationApi";

import { INotification } from "../../types/notificationTypes";

interface ApiError {
  message: string;
}

const getError = (error: unknown): string => {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data?.message || "Something went wrong";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

/**
 * Fetch notifications
 */
export const fetchNotifications = createAsyncThunk<INotification[]>(
  "notification/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getNotifications();
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);

/**
 * Mark single notification as read
 */
export const markNotificationAsReadThunk = createAsyncThunk<
  INotification,
  string
>("notification/markRead", async (id, thunkAPI) => {
  try {
    return await markAsRead(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Mark all notifications as read
 */
export const markAllNotificationsReadThunk = createAsyncThunk<void>(
  "notification/markAllRead",
  async (_, thunkAPI) => {
    try {
      await markAllAsRead();
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);

/**
 * Delete notification
 */
export const deleteNotificationThunk = createAsyncThunk<string, string>(
  "notification/delete",
  async (id, thunkAPI) => {
    try {
      await deleteNotification(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);