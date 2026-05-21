import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi, getMeApi } from "../../api/authApi";
import {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "./authTypes";

// LOGIN
export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (data, { rejectWithValue }) => {
  try {
    return await loginApi(data);
  } catch {
    return rejectWithValue("Login failed");
  }
});

// REGISTER
export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (data, { rejectWithValue }) => {
  try {
    return await registerApi(data);
  } catch {
    return rejectWithValue("Register failed");
  }
});

// LOAD USER
export const loadUser = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string }
>("auth/loadUser", async (_, { rejectWithValue }) => {
  try {
    return await getMeApi();
  } catch {
    return rejectWithValue("Failed to load user!");
  }
});