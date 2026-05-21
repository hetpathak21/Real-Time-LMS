export type UserRole = "student" | "teacher" | "admin";
export type UserStatus = "active" | "blocked";

export interface AdminUserQuery {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
  page?: number | string;
  limit?: number | string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: UserRole;
  avatar?: string;
  isVerified?: boolean;
}

export interface UpdateUserStatusPayload {
  status: UserStatus;
}
