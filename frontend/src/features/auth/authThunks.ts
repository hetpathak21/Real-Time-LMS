import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi, getMeApi } from "../../api/authApi";
import { LoginPayload, RegisterPayload, AuthResponse } from "./authTypes";
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
