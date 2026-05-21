"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdminUserService = exports.updateAdminUserStatusService = exports.updateAdminUserService = exports.getAdminUserByIdService = exports.getAdminUsersService = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const Messages_1 = require("../../constants/Messages");
const StatusCodes_1 = require("../../constants/StatusCodes");
const appError_1 = require("../../utils/appError");
const dbCall_1 = require("../../utils/dbCall");
const SAFE_USER_PROJECTION = "-password";
const getAdminUsersService = async (query) => {
    return (0, dbCall_1.dbCall)(async () => {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        const filter = {};
        if (query.role) {
            filter.role = query.role;
        }
        if (query.status) {
            filter.isActive = query.status === "active";
        }
        if (query.search) {
            filter.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { email: { $regex: query.search, $options: "i" } },
            ];
        }
        const [users, total] = await Promise.all([
            UserModel_1.default.find(filter)
                .select(SAFE_USER_PROJECTION)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            UserModel_1.default.countDocuments(filter),
        ]);
        return {
            users,
            meta: {
                page,
                limit,
                total,
            },
        };
    });
};
exports.getAdminUsersService = getAdminUsersService;
const getAdminUserByIdService = async (userId) => {
    return (0, dbCall_1.dbCall)(async () => {
        const user = await UserModel_1.default.findById(userId).select(SAFE_USER_PROJECTION);
        if (!user) {
            throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.USER_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        return user;
    });
};
exports.getAdminUserByIdService = getAdminUserByIdService;
const updateAdminUserService = async (userId, payload) => {
    return (0, dbCall_1.dbCall)(async () => {
        if (payload.email) {
            const existing = await UserModel_1.default.findOne({
                email: payload.email,
                _id: { $ne: userId },
            });
            if (existing) {
                throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.USER_ALREADY_EXISTS, StatusCodes_1.STATUS_CODES.CONFLICT);
            }
        }
        const user = await UserModel_1.default.findByIdAndUpdate(userId, { $set: payload }, { new: true, runValidators: true }).select(SAFE_USER_PROJECTION);
        if (!user) {
            throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.USER_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        return user;
    });
};
exports.updateAdminUserService = updateAdminUserService;
const updateAdminUserStatusService = async (userId, adminUserId, payload) => {
    return (0, dbCall_1.dbCall)(async () => {
        if (userId === adminUserId) {
            throw new appError_1.AppError("Admins cannot change their own status", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
        }
        const user = await UserModel_1.default.findByIdAndUpdate(userId, { $set: { isActive: payload.status === "active" } }, { new: true, runValidators: true }).select(SAFE_USER_PROJECTION);
        if (!user) {
            throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.USER_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        return user;
    });
};
exports.updateAdminUserStatusService = updateAdminUserStatusService;
const deleteAdminUserService = async (userId, adminUserId) => {
    return (0, dbCall_1.dbCall)(async () => {
        if (userId === adminUserId) {
            throw new appError_1.AppError("Admins cannot delete their own account", StatusCodes_1.STATUS_CODES.BAD_REQUEST);
        }
        const user = await UserModel_1.default.findByIdAndDelete(userId).select(SAFE_USER_PROJECTION);
        if (!user) {
            throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.USER_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
        }
        return {
            deletedUser: user,
            message: Messages_1.GENERAL_MESSAGES.DATA_DELETED,
        };
    });
};
exports.deleteAdminUserService = deleteAdminUserService;
