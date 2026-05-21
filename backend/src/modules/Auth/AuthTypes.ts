export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role?: "student" | "teacher" | "admin";
}

export interface LoginPayload {
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