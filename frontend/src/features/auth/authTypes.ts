import { IUser } from "../../types/userTypes";

export interface AuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
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
  avatar?: FileList;
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
