import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import {
  getMyProfile,
  getAllUsers,
  updateUserProfile,
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