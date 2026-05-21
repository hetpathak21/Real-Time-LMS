// import { Request, Response, NextFunction } from "express";
// import { verifyAccessToken } from "../utils/jwt";
// import { AppError } from "../utils/appError";
// import { STATUS_CODES } from "../constants/StatusCodes";
// import { AUTH_MESSAGES } from "../constants/Messages";

// export type AuthRequest = Request;

// // Middleware to authenticate user using JWT
// export const authMiddleware = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     throw new AppError(AUTH_MESSAGES.TOKEN_MISSING, STATUS_CODES.UNAUTHORIZED);
//   }
//   const [bearer, token] = authHeader.split(" ");

//   if (bearer !== "Bearer" || !token) {
    
//     throw new AppError(
//       AUTH_MESSAGES.INVALID_TOKEN || "Invalid token format",
//       STATUS_CODES.UNAUTHORIZED,
//     );
//   }

//   try {
//     const decoded = verifyAccessToken(token);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     throw new AppError(
//       AUTH_MESSAGES.INVALID_TOKEN || "Invalid or expired token",
//       STATUS_CODES.UNAUTHORIZED,
//     );
//   }
// };

import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, JwtPayload } from "../utils/jwt";
import { AppError } from "../utils/appError";
import { STATUS_CODES } from "../constants/StatusCodes";
import { AUTH_MESSAGES } from "../constants/Messages";

export type AuthRequest = Request & {
  user?: JwtPayload;
};

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(
      new AppError(AUTH_MESSAGES.TOKEN_MISSING, STATUS_CODES.UNAUTHORIZED)
    );
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(
      new AppError(
        AUTH_MESSAGES.INVALID_TOKEN || "Invalid token format",
        STATUS_CODES.UNAUTHORIZED
      )
    );
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch {
    return next(
      new AppError(
        AUTH_MESSAGES.INVALID_TOKEN || "Invalid or expired token",
        STATUS_CODES.UNAUTHORIZED
      )
    );
  }
};