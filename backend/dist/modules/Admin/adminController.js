"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdminUser = exports.updateAdminUserStatus = exports.updateAdminUser = exports.getAdminUserById = exports.getAdminUsers = void 0;
const StatusCodes_1 = require("../../constants/StatusCodes");
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const adminService_1 = require("./adminService");
exports.getAdminUsers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await (0, adminService_1.getAdminUsersService)(req.query);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "Users fetched successfully", result);
});
exports.getAdminUserById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const user = await (0, adminService_1.getAdminUserByIdService)(userId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "User fetched successfully", user);
});
exports.updateAdminUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const user = await (0, adminService_1.updateAdminUserService)(userId, req.body);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "User updated successfully", user);
});
exports.updateAdminUserStatus = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const adminUserId = req.user?.userId;
    const user = await (0, adminService_1.updateAdminUserStatusService)(userId, adminUserId, req.body);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "User status updated successfully", user);
});
exports.deleteAdminUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const adminUserId = req.user?.userId;
    const result = await (0, adminService_1.deleteAdminUserService)(userId, adminUserId);
    return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODES.SUCCESS, true, "User deleted successfully", result);
});
