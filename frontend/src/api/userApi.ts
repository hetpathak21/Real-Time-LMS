import axiosInstance from "./axiosInstance";
import { IUser } from "../types/userTypes";

/**
 * Get logged-in user profile
 */
export const getMyProfile = async (): Promise<IUser> => {
  const res = await axiosInstance.get("/auth/me");
  return res.data.data;
};

/**
 * Get user by ID (Admin/Teacher use case)
 */
export const getUserById = async (userId: string): Promise<IUser> => {
  const res = await axiosInstance.get(`/users/${userId}`);
  return res.data;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  _userId: string,
  data: Partial<IUser>
): Promise<IUser> => {
  const res = await axiosInstance.put("/auth/profile", data);
  return res.data.data;
};

/**
 * Get all users (Admin only)
 */
export const getAllUsers = async (): Promise<IUser[]> => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

/**
 * Delete a user (Admin only)
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await axiosInstance.delete(`/users/${userId}`);
};
