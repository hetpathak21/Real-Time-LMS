"use strict";
// import { Request, Response } from "express";
// import { asyncHandler } from "../../utils/asyncHandler";
// import { sendResponse } from "../../utils/sendResponse";
// import { STATUS_CODES } from "../../constants/StatusCodes";
// import { AUTH_MESSAGES } from "../../constants/Messages";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = exports.updateProfileController = exports.getMeController = exports.logoutController = exports.refreshTokenController = exports.loginController = exports.signupController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const StatusCodes_1 = require("../../constants/StatusCodes");
const Messages_1 = require("../../constants/Messages");
const AuthServices_1 = require("./AuthServices");
/* ---------------- REGISTER ---------------- */
exports.signupController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await (0, AuthServices_1.signupService)(req.body);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.CREATED, true, Messages_1.AUTH_MESSAGES.REGISTER_SUCCESS, result);
});
/* ---------------- LOGIN ---------------- */
exports.loginController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await (0, AuthServices_1.loginService)(req.body);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, Messages_1.AUTH_MESSAGES.LOGIN_SUCCESS, result);
});
/* ---------------- REFRESH TOKEN ---------------- */
exports.refreshTokenController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await (0, AuthServices_1.refreshTokenService)(req.body.refreshToken);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Token refreshed", result);
});
/* ---------------- LOGOUT ---------------- */
exports.logoutController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await (0, AuthServices_1.logoutService)();
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, Messages_1.AUTH_MESSAGES.LOGOUT_SUCCESS, null);
});
/* ---------------- GET ME ---------------- */
exports.getMeController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId;
    const result = await (0, AuthServices_1.getMeService)(userId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "User fetched successfully", result);
});
/* ---------------- UPDATE PROFILE ---------------- */
exports.updateProfileController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId;
    const result = await (0, AuthServices_1.updateProfileService)(userId, req.body);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Profile updated successfully", result);
});
/* ---------------- CHANGE PASSWORD ---------------- */
exports.changePasswordController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId;
    const result = await (0, AuthServices_1.changePasswordService)(userId, req.body);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Password changed successfully", result);
});
