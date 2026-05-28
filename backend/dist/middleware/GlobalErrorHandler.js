"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const appError_1 = require("../utils/appError");
const StatusCodes_1 = require("../constants/StatusCodes");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = StatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";
    let errors;
    if (err instanceof appError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof multer_1.default.MulterError) {
        statusCode = StatusCodes_1.STATUS_CODES.BAD_REQUEST;
        message =
            err.code === "LIMIT_FILE_SIZE"
                ? "Image must be 5MB or smaller"
                : err.message;
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = StatusCodes_1.STATUS_CODES.BAD_REQUEST;
        message = "Validation failed";
        errors = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message,
        }));
    }
    else if (err instanceof mongoose_1.default.Error.CastError) {
        statusCode = StatusCodes_1.STATUS_CODES.BAD_REQUEST;
        message = "Invalid id format";
        errors = [
            {
                field: err.path,
                message: `${err.value} is not a valid ${err.path}`,
            },
        ];
    }
    else if (err.code === 11000) {
        statusCode = StatusCodes_1.STATUS_CODES.BAD_REQUEST;
        message = "Duplicate field value";
        errors = Object.keys(err.keyValue || {}).map((field) => ({
            field,
            message: `${field} already exists`,
        }));
    }
    return res.status(statusCode).json({
        statusCode,
        success: false,
        message,
        errors,
    });
};
exports.globalErrorHandler = globalErrorHandler;
