import { IUser } from "../../types/userTypes";

export interface AuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  teachers: ITeacher[];
  teachersLoading: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name?: string;
  avatar?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  user: IUser;
  token: string;
  refreshToken?: string;
}

export interface ErrorResponse {
  message: string;
}

export interface ITeacher {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}
