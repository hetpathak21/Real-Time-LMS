export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  avatar?: string;
  isActive?: boolean;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}