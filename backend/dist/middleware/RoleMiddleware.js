"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const appError_1 = require("../utils/appError");
const StatusCodes_1 = require("../constants/StatusCodes");
const authorizeRoles = (...roles) => {
    return (req, _res, next) => {
        const userRole = req.user?.role;
        if (!userRole) {
            return next(new appError_1.AppError("Role missing", StatusCodes_1.STATUS_CODES.UNAUTHORIZED));
        }
        if (!roles.includes(userRole)) {
            return next(new appError_1.AppError("Access denied: insufficient permissions", StatusCodes_1.STATUS_CODES.FORBIDDEN));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
