import axiosInstance from "./axiosInstance";
import { LoginPayload, RegisterPayload } from "../features/auth/authTypes";

export const loginApi = async (data: LoginPayload) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const registerApi = async (data: RegisterPayload) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const getMeApi = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};