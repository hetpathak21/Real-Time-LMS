import axiosInstance from "./axiosInstance";
import { IUser } from "../types/userTypes";

interface UsersListResponse {
  users: IUser[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

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
  const res = await axiosInstance.get(`/admin/users/${userId}`);
  return res.data.data;
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
  const res = await axiosInstance.get("/admin/users");
  const payload = res.data.data as UsersListResponse;
  return payload.users;
};

/**
 * Delete a user (Admin only)
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await axiosInstance.delete(`/admin/users/${userId}`);
};

/**
 * Update user active status (Admin only)
 */
export const updateUserStatus = async (
  userId: string,
  status: "active" | "blocked"
): Promise<IUser> => {
  const res = await axiosInstance.patch(`/admin/users/${userId}/status`, { status });
  return res.data.data;
};
