import { MESSAGES } from "../constants/messages";
import { STATUS_CODES } from "../constants/statusCodes";
import { AppError } from "./appError";

export const dbCall = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (err: any) {
    console.error("[DB_ERROR]", err);

    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      MESSAGES.INTERNAL_ERROR ?? "Database operation failed",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
    );
  }
};
