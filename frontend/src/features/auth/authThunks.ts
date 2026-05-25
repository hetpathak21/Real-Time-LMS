import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePasswordApi,
  getMeApi,
  loginApi,
  logoutApi,
  registerApi,
  updateProfileApi,
} from "../../api/authApi";
import {
  ChangePasswordPayload,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  AuthResponse,
} from "./authTypes";
import { IUser } from "../../types/userTypes";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Unable to reach server. Please check backend and CORS settings.";
    }

    return (
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      fallback
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    return await loginApi(data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Login failed"));
  }
});

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (data, { rejectWithValue }) => {
  try {
    return await registerApi(data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Register failed"));
  }
});

export const loadUser = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string }
>("auth/loadUser", async (_, { rejectWithValue }) => {
  try {
    return await getMeApi();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to load user!"));
  }
});

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logoutApi();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Logout failed"));
  }
});

export const updateProfile = createAsyncThunk<
  IUser,
  UpdateProfilePayload,
  { rejectValue: string }
>("auth/updateProfile", async (data, { rejectWithValue }) => {
  try {
    return await updateProfileApi(data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Profile update failed"));
  }
});

export const changePassword = createAsyncThunk<
  void,
  ChangePasswordPayload,
  { rejectValue: string }
>("auth/changePassword", async (data, { rejectWithValue }) => {
  try {
    await changePasswordApi(data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Password change failed"));
  }
});
