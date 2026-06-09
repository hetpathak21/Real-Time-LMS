import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import {
  getMyProfile,
  getAllUsers,
  updateUserProfile,
  deleteUser,
  updateUserStatus,
} from "../../api/userApi";

import { IUser } from "../../types/userTypes";

/**
 * Backend error shape
 */
interface ApiErrorResponse {
  message: string;
}

/**
 * Safe error extractor (fully typed internally)
 */
const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ApiErrorResponse>;
    return err.response?.data?.message || "Something went wrong";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

/**
 * Fetch logged-in user profile
 */
export const fetchMyProfile = createAsyncThunk<IUser>(
  "user/fetchMyProfile",
  async (_, thunkAPI) => {
    try {
      return await getMyProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * Fetch all users (Admin only)
 */
export const fetchAllUsers = createAsyncThunk<IUser[]>(
  "user/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      return await getAllUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * Update user profile
 */
export const updateUserProfileThunk = createAsyncThunk<
  IUser,
  { userId: string; data: Partial<IUser> }
>(
  "user/updateUserProfile",
  async ({ userId, data }, thunkAPI) => {
    try {
      return await updateUserProfile(userId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * Delete user (Admin only)
 */
export const deleteUserThunk = createAsyncThunk<string, string>(
  "user/deleteUser",
  async (userId, thunkAPI) => {
    try {
      await deleteUser(userId);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * Update user status (Admin only)
 */
export const updateUserStatusThunk = createAsyncThunk<
  IUser,
  { userId: string; status: "active" | "blocked" }
>("user/updateUserStatus", async ({ userId, status }, thunkAPI) => {
  try {
    return await updateUserStatus(userId, status);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});