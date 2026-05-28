import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import multer from "multer";
import { AppError } from "../utils/appError";
import { STATUS_CODES } from "../constants/StatusCodes";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = STATUS_CODES.INTERNAL_SERVER_ERROR;
  let message = "Internal server error";
  let errors: any[] | undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  else if (err instanceof multer.MulterError) {
    statusCode = STATUS_CODES.BAD_REQUEST;
    message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Image must be 5MB or smaller"
        : err.message;
  }

  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = STATUS_CODES.BAD_REQUEST;
    message = "Validation failed";

    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
  }

  else if (err instanceof mongoose.Error.CastError) {
    statusCode = STATUS_CODES.BAD_REQUEST;
    message = "Invalid id format";

    errors = [
      {
        field: err.path,
        message: `${err.value} is not a valid ${err.path}`,
      },
    ];
  }

  else if ((err as any).code === 11000) {
    statusCode = STATUS_CODES.BAD_REQUEST;
    message = "Duplicate field value";

    errors = Object.keys((err as any).keyValue || {}).map((field) => ({
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
