import { GENERAL_MESSAGES } from "../constants/Messages";
import { STATUS_CODES } from "../constants/StatusCodes";
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
      GENERAL_MESSAGES.SERVER_ERROR ?? "Database operation failed",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
    );
  }
};
