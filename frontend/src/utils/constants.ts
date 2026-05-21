export const USER_ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

/* -------------------------------------------------------------------------- */
/*                                ROUTES                                      */
/* -------------------------------------------------------------------------- */

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",

  STUDENT_DASHBOARD: "/student/dashboard",
  TEACHER_DASHBOARD: "/teacher/dashboard",
  ADMIN_DASHBOARD: "/admin/dashboard",
} as const;

/* -------------------------------------------------------------------------- */
/*                               API STATUS                                   */
/* -------------------------------------------------------------------------- */

export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;