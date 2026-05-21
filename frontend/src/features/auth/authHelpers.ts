import { IUser } from "../../types/userTypes";

export const getDashboardPathByRole = (role?: IUser["role"]) => {
  switch (role) {
    case "teacher":
      return "/teacher/dashboard";
    case "admin":
      return "/admin/dashboard";
    case "student":
    default:
      return "/student/dashboard";
  }
};
