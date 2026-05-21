import User from "../../models/UserModel";
import { AUTH_MESSAGES, GENERAL_MESSAGES } from "../../constants/Messages";
import { STATUS_CODES } from "../../constants/StatusCodes";
import { AppError } from "../../utils/appError";
import { dbCall } from "../../utils/dbCall";
import {
  AdminUserQuery,
  UpdateUserPayload,
  UpdateUserStatusPayload,
} from "./AdminTypes";

const SAFE_USER_PROJECTION = "-password";

export const getAdminUsersService = async (query: AdminUserQuery) => {
  return dbCall(async () => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (query.role) {
      filter.role = query.role;
    }

    if (query.status) {
      filter.isActive = query.status === "active";
    }

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(filter)
        .select(SAFE_USER_PROJECTION)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    return {
      users,
      meta: {
        page,
        limit,
        total,
      },
    };
  });
};

export const getAdminUserByIdService = async (userId: string) => {
  return dbCall(async () => {
    const user = await User.findById(userId).select(SAFE_USER_PROJECTION);

    if (!user) {
      throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    return user;
  });
};

export const updateAdminUserService = async (
  userId: string,
  payload: UpdateUserPayload
) => {
  return dbCall(async () => {
    if (payload.email) {
      const existing = await User.findOne({
        email: payload.email,
        _id: { $ne: userId },
      });

      if (existing) {
        throw new AppError(
          AUTH_MESSAGES.USER_ALREADY_EXISTS,
          STATUS_CODES.CONFLICT
        );
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: payload },
      { new: true, runValidators: true }
    ).select(SAFE_USER_PROJECTION);

    if (!user) {
      throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    return user;
  });
};

export const updateAdminUserStatusService = async (
  userId: string,
  adminUserId: string,
  payload: UpdateUserStatusPayload
) => {
  return dbCall(async () => {
    if (userId === adminUserId) {
      throw new AppError(
        "Admins cannot change their own status",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { isActive: payload.status === "active" } },
      { new: true, runValidators: true }
    ).select(SAFE_USER_PROJECTION);

    if (!user) {
      throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    return user;
  });
};

export const deleteAdminUserService = async (
  userId: string,
  adminUserId: string
) => {
  return dbCall(async () => {
    if (userId === adminUserId) {
      throw new AppError(
        "Admins cannot delete their own account",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const user = await User.findByIdAndDelete(userId).select(SAFE_USER_PROJECTION);

    if (!user) {
      throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    return {
      deletedUser: user,
      message: GENERAL_MESSAGES.DATA_DELETED,
    };
  });
};
