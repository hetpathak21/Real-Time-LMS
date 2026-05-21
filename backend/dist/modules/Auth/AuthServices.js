"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordService = exports.updateProfileService = exports.getMeService = exports.logoutService = exports.refreshTokenService = exports.loginService = exports.signupService = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const bcrypt_1 = require("../../utils/bcrypt");
const jwt_1 = require("../../utils/jwt");
const appError_1 = require("../../utils/appError");
const StatusCodes_1 = require("../../constants/StatusCodes");
const Messages_1 = require("../../constants/Messages");
/* ---------------- REGISTER ---------------- */
const signupService = async (data) => {
    const { name, email, password, role } = data;
    const existing = await UserModel_1.default.findOne({ email });
    if (existing) {
        throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.USER_ALREADY_EXISTS, StatusCodes_1.STATUS_CODES.CONFLICT);
    }
    const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
    const user = await UserModel_1.default.create({
        name,
        email,
        password: hashedPassword,
        role: role || "student",
    });
    const safeUser = await UserModel_1.default.findById(user._id)
        .select("-password");
    return { safeUser };
};
exports.signupService = signupService;
/* ---------------- LOGIN ---------------- */
const loginService = async (data) => {
    const { email, password } = data;
    const user = await UserModel_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.USER_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
    }
    const match = await (0, bcrypt_1.comparePassword)(password, user.password);
    if (!match) {
        throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.INVALID_CREDENTIALS, StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const accessToken = (0, jwt_1.generateAccessToken)({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    });
    const refreshToken = (0, jwt_1.generateRefreshToken)({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    });
    const safeUser = await UserModel_1.default.findById(user._id)
        .select("-password");
    return { safeUser, accessToken, refreshToken };
};
exports.loginService = loginService;
/* ---------------- REFRESH TOKEN ---------------- */
const refreshTokenService = async (token) => {
    if (!token) {
        throw new appError_1.AppError("Refresh Token Required", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const decoded = (0, jwt_1.verifyRefreshToken)(token);
    const user = await UserModel_1.default.findById(decoded.userId);
    if (!user) {
        throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.USER_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
    }
    const newAccessToken = (0, jwt_1.generateAccessToken)({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    });
    return { accessToken: newAccessToken };
};
exports.refreshTokenService = refreshTokenService;
/* ---------------- LOGOUT ---------------- */
const logoutService = async () => {
    // JWT stateless → frontend clears tokens
    return true;
};
exports.logoutService = logoutService;
/* ---------------- GET ME ---------------- */
const getMeService = async (userId) => {
    const user = await UserModel_1.default.findById(userId).select("-password");
    if (!user) {
        throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.USER_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
    }
    return user;
};
exports.getMeService = getMeService;
/* ---------------- UPDATE PROFILE ---------------- */
const updateProfileService = async (userId, data) => {
    const user = await UserModel_1.default.findByIdAndUpdate(userId, { $set: data }, { new: true }).select("-password");
    if (!user) {
        throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.USER_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
    }
    return user;
};
exports.updateProfileService = updateProfileService;
/* ---------------- CHANGE PASSWORD ---------------- */
const changePasswordService = async (userId, data) => {
    const { oldPassword, newPassword } = data;
    const user = await UserModel_1.default.findById(userId).select("+password");
    if (!user) {
        throw new appError_1.AppError(Messages_1.AUTH_MESSAGES.USER_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
    }
    const isMatch = await (0, bcrypt_1.comparePassword)(oldPassword, user.password);
    if (!isMatch) {
        throw new appError_1.AppError("Old password is incorrect", StatusCodes_1.STATUS_CODES.UNAUTHORIZED);
    }
    const hashed = await (0, bcrypt_1.hashPassword)(newPassword);
    user.password = hashed;
    await user.save();
    return true;
};
exports.changePasswordService = changePasswordService;
