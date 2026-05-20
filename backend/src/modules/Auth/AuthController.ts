import { Request, Response } from "express";

import {
  signupService,
  loginService
} from "./AuthServices";

import { sendResponse } from "../../utils/sendResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { STATUS_CODES } from "../../constants/StatusCodes";
import { AUTH_MESSAGES } from "../../constants/Messages";
import { AppError } from "../../utils/appError";

/* ---------------- SIGNUP ---------------- */
export const signupController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await signupService(req.body);

    return sendResponse(
      res,
      STATUS_CODES.CREATED,
      true,
      AUTH_MESSAGES.REGISTER_SUCCESS,
      result
    );
  }
);

/* ---------------- LOGIN ---------------- */
export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await loginService(req.body);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      AUTH_MESSAGES.LOGIN_SUCCESS,
      result
    );
  }
);
