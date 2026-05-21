import { Response, NextFunction } from "express";
import { AuthRequest } from "./AuthMiddleware";
import { AppError } from "../utils/appError";
import { STATUS_CODES } from "../constants/StatusCodes";

export type Role = "student" | "teacher" | "admin";

export const authorizeRoles = (...roles: Role[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return next(
        new AppError("Role missing", STATUS_CODES.UNAUTHORIZED)
      );
    }

    if (!roles.includes(userRole as Role)) {
      return next(
        new AppError(
          "Access denied: insufficient permissions",
          STATUS_CODES.FORBIDDEN
        )
      );
    }

    next();
  };
};