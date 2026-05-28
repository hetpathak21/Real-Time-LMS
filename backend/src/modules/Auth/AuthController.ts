import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { STATUS_CODES } from "../../constants/StatusCodes";
import { AUTH_MESSAGES } from "../../constants/Messages";

import {
  signupService,
  loginService,
  refreshTokenService,
  logoutService,
  getMeService,
  updateProfileService,
  changePasswordService,
  getTeachersService
} from "./AuthServices";

/* ---------------- REGISTER ---------------- */
export const signupController = asyncHandler(async (req: Request, res: Response) => {
  const result = await signupService(req.body);

  return sendResponse(res, STATUS_CODES.CREATED, true, AUTH_MESSAGES.REGISTER_SUCCESS, result);
});

/* ---------------- LOGIN ---------------- */
export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginService(req.body);

  return sendResponse(res, STATUS_CODES.SUCCESS, true, AUTH_MESSAGES.LOGIN_SUCCESS, result);
});

/* ---------------- REFRESH TOKEN ---------------- */
export const refreshTokenController = asyncHandler(async (req: Request, res: Response) => {
  const result = await refreshTokenService(req.body.refreshToken);

  return sendResponse(res, STATUS_CODES.SUCCESS, true, "Token refreshed", result);
});

/* ---------------- LOGOUT ---------------- */
export const logoutController = asyncHandler(async (req: any, res: Response) => {
  await logoutService();

  return sendResponse(res, STATUS_CODES.SUCCESS, true, AUTH_MESSAGES.LOGOUT_SUCCESS, null);
});

/* ---------------- GET ME ---------------- */
export const getMeController = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user?.userId;

  const result = await getMeService(userId);

  return sendResponse(res, STATUS_CODES.SUCCESS, true, "User fetched successfully", result);
});

/* ---------------- UPDATE PROFILE ---------------- */
// export const updateProfileController = asyncHandler(async (req: any, res: Response) => {
//   const userId = req.user?.userId;

//   const result = await updateProfileService(userId, req.body);

//   return sendResponse(res, STATUS_CODES.SUCCESS, true, "Profile updated successfully", result);
// });

/* ---------------- UPDATE PROFILE ---------------- */
export const updateProfileController = asyncHandler(
  async (req: any, res: Response) => {
    const userId = req.user?.userId;
    const avatarUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/profiles/${req.file.filename}`
      : undefined;
    const payload = {
      ...req.body,
      ...(avatarUrl ? { avatar: avatarUrl } : {}),
    };
    const result = await updateProfileService(userId, payload);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Profile updated successfully",
      result
    );
  }
);

/* ---------------- CHANGE PASSWORD ---------------- */
export const changePasswordController = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user?.userId;

  const result = await changePasswordService(userId, req.body);

  return sendResponse(res, STATUS_CODES.SUCCESS, true, "Password changed successfully", result);
});

/* ---------------- GET TEACHERS ---------------- */
export const getTeachersController = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getTeachersService();

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Teachers fetched successfully!",
      result
    );
  }
);
