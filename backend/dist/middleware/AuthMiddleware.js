"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const appError_1 = require("../utils/appError");
const StatusCodes_1 = require("../constants/StatusCodes");
const Messages_1 = require("../constants/Messages");
const authMiddleware = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new appError_1.AppError(Messages_1.AUTH_MESSAGES.TOKEN_MISSING, StatusCodes_1.STATUS_CODES.UNAUTHORIZED));
    }
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        return next(new appError_1.AppError(Messages_1.AUTH_MESSAGES.INVALID_TOKEN || "Invalid token format", StatusCodes_1.STATUS_CODES.UNAUTHORIZED));
    }
    try {
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        req.user = decoded;
        next();
    }
    catch {
        return next(new appError_1.AppError(Messages_1.AUTH_MESSAGES.INVALID_TOKEN || "Invalid or expired token", StatusCodes_1.STATUS_CODES.UNAUTHORIZED));
    }
};
exports.authMiddleware = authMiddleware;
