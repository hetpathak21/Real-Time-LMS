"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES = exports.GENERAL_MESSAGES = exports.AUTH_MESSAGES = void 0;
exports.AUTH_MESSAGES = {
    REGISTER_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",
    INVALID_CREDENTIALS: "Invalid email or password",
    USER_NOT_FOUND: "User not found",
    USER_ALREADY_EXISTS: "User already exists",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access denied",
    LOGOUT_SUCCESS: "Logout Successfully",
    TOKEN_MISSING: "Authentication token missing",
    INVALID_TOKEN: "Invalid or expired token",
    PROFILE_FETCHED: "Profile fetched successfully",
    PROFILE_UPDATED: "Profile updated successfully",
    PASSWORD_UPDATED: "Password updated successfully",
    ACCOUNT_BLOCKED: "Your account has been blocked",
    ACCOUNT_NOT_VERIFIED: "Account is not verified",
};
exports.GENERAL_MESSAGES = {
    SERVER_ERROR: "Internal server error",
    SOMETHING_WENT_WRONG: "Something went wrong",
    DATA_FETCHED: "Data fetched successfully",
    DATA_CREATED: "Data created successfully",
    DATA_UPDATED: "Data updated successfully",
    DATA_DELETED: "Data deleted successfully",
    INVALID_REQUEST: "Invalid request",
    NOT_FOUND: "Resource not found",
};
exports.ROLES = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};
