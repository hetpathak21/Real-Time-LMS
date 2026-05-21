import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/AuthMiddleware";
import { STATUS_CODES } from "../../constants/StatusCodes";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import {
  deleteAdminUserService,
  getAdminUserByIdService,
  getAdminUsersService,
  updateAdminUserService,
  updateAdminUserStatusService,
} from "./adminService";

export const getAdminUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getAdminUsersService(req.query);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Users fetched successfully",
      result
    );
  }
);

export const getAdminUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params as { userId: string };
    const user = await getAdminUserByIdService(userId);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "User fetched successfully",
      user
    );
  }
);

export const updateAdminUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params as { userId: string };
    const user = await updateAdminUserService(userId, req.body);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "User updated successfully",
      user
    );
  }
);

export const updateAdminUserStatus = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { userId } = req.params as { userId: string };
    const adminUserId = req.user?.userId;
    const user = await updateAdminUserStatusService(userId, adminUserId!, req.body);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "User status updated successfully",
      user
    );
  }
);

export const deleteAdminUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { userId } = req.params as { userId: string };
    const adminUserId = req.user?.userId;
    const result = await deleteAdminUserService(userId, adminUserId!);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "User deleted successfully",
      result
    );
  }
);
