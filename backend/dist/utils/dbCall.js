"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbCall = void 0;
const Messages_1 = require("../constants/Messages");
const StatusCodes_1 = require("../constants/StatusCodes");
const appError_1 = require("./appError");
const dbCall = async (fn) => {
    try {
        return await fn();
    }
    catch (err) {
        console.error("[DB_ERROR]", err);
        if (err instanceof appError_1.AppError) {
            throw err;
        }
        throw new appError_1.AppError(Messages_1.GENERAL_MESSAGES.SERVER_ERROR ?? "Database operation failed", StatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};
exports.dbCall = dbCall;
