import axios from "axios";
import axiosInstance from "./axiosInstance";
import {
  ChangePasswordPayload,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
} from "../features/auth/authTypes";

export const loginApi = async (data: LoginPayload) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data.data;
};

export const registerApi = async (data: RegisterPayload) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data.data;
};

const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

export const refreshTokenApi = async (refreshToken: string) => {
  const res = await authClient.post("/auth/refresh-token", {
    refreshToken,
  });
  return res.data.data; // { accessToken }
};

export const getMeApi = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data.data;
};

export const logoutApi = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const updateProfileApi = async (data: UpdateProfilePayload) => {
  const res = await axiosInstance.put("/auth/profile", data);
  return res.data.data;
};

export const changePasswordApi = async (data: ChangePasswordPayload) => {
  const res = await axiosInstance.put("/auth/change-password", data);
  return res.data;
};

export const getTeachersApi = async () => {
  const res = await axiosInstance.get("/auth/teachers");
  return res.data.data;
};
