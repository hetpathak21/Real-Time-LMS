import { Response } from "express";

interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

const sendResponse = <T>(
  res: Response,
  payload: IApiResponse<T>
) => {
  const {
    success,
    statusCode,
    message,
    data,
    meta,
  } = payload;

  return res.status(statusCode).json({
    success,
    message,
    meta,
    data,
  });
};

export default sendResponse;