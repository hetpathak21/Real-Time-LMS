import { UserRole } from "./constants";

/* -------------------------------------------------------------------------- */
/*                              ROLE HELPERS                                  */
/* -------------------------------------------------------------------------- */

export const isStudent = (role: UserRole): boolean => {
  return role === "student";
};

export const isTeacher = (role: UserRole): boolean => {
  return role === "teacher";
};

export const isAdmin = (role: UserRole): boolean => {
  return role === "admin";
};

/* -------------------------------------------------------------------------- */
/*                          PERMISSION HELPERS                                */
/* -------------------------------------------------------------------------- */

export const canCreateCourse = (role: UserRole): boolean => {
  return role === "teacher" || role === "admin";
};

export const canManageUsers = (role: UserRole): boolean => {
  return role === "admin";
};

/* -------------------------------------------------------------------------- */
/*                           STRING HELPERS                                   */
/* -------------------------------------------------------------------------- */

export const capitalize = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};