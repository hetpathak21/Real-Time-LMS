import { QueryFilter, Types } from "mongoose";
import Notification, {
  INotification,
} from "../../models/NotificationModel";
import { AppError } from "../../utils/appError";
import { dbCall } from "../../utils/dbCall";
import { STATUS_CODES } from "../../constants/StatusCodes";
import {
  CreateNotificationPayload,
  NotificationQuery,
  NotificationViewer,
  UpdateNotificationPayload,
} from "./notificationTypes";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const assertObjectId = (id: string, label: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(`Invalid ${label}`, STATUS_CODES.BAD_REQUEST);
  }
};

const toBoolean = (value: string | boolean | undefined) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return undefined;
};

const getReadState = (query: NotificationQuery) => {
  const explicitReadState = toBoolean(query.isRead);

  if (explicitReadState !== undefined) {
    return explicitReadState;
  }

  if (query.status === "read") {
    return true;
  }

  if (query.status === "unread") {
    return false;
  }

  return undefined;
};

const getPagination = (query: NotificationQuery) => {
  const page = Math.max(Number(query.page) || DEFAULT_PAGE, DEFAULT_PAGE);
  const requestedLimit = Math.max(Number(query.limit) || DEFAULT_LIMIT, 1);
  const limit = Math.min(requestedLimit, MAX_LIMIT);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const resolveTargetUserId = (payload: CreateNotificationPayload) => {
  const targetUserId = payload.userId ?? payload.recipient;

  if (!targetUserId) {
    throw new AppError(
      "Notification recipient is required",
      STATUS_CODES.BAD_REQUEST
    );
  }

  const userId = targetUserId.toString();
  assertObjectId(userId, "recipient id");

  return userId;
};

const assertCanAccessNotification = (
  notification: INotification,
  viewer: NotificationViewer
) => {
  if (
    viewer.role !== "admin" &&
    notification.userId.toString() !== viewer.userId
  ) {
    throw new AppError("Notification not found", STATUS_CODES.NOT_FOUND);
  }
};

export const createNotificationService = async (
  payload: CreateNotificationPayload
) => {
  return dbCall(async () => {
    const userId = resolveTargetUserId(payload);

    const notification = await Notification.create({
      userId,
      title: payload.title?.trim(),
      message: payload.message.trim(),
      type: payload.type,
      isRead: payload.status
        ? payload.status === "read"
        : payload.isRead ?? false,
    });

    return notification;
  });
};

export const getNotificationsService = async (
  viewer: NotificationViewer,
  query: NotificationQuery
) => {
  return dbCall(async () => {
    const { page, limit, skip } = getPagination(query);
    const filter: QueryFilter<INotification> = {};
    const requestedUserId = query.userId ?? query.recipient;

    if (viewer.role === "admin" && requestedUserId) {
      assertObjectId(requestedUserId, "user id");
      filter.userId = requestedUserId;
    } else {
      filter.userId = viewer.userId;
    }

    if (query.type) {
      filter.type = query.type;
    }

    const isRead = getReadState(query);

    if (isRead !== undefined) {
      filter.isRead = isRead;
    }

    const unreadFilter: QueryFilter<INotification> = {
      userId: filter.userId,
      isRead: false,
    };

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(filter)
        .populate("userId", "name email avatar role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Notification.countDocuments(filter),
      Notification.countDocuments(unreadFilter),
    ]);

    return {
      notifications,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        unreadCount,
      },
    };
  });
};

export const getMyNotificationsService = async (
  userId: string,
  query: NotificationQuery
) => {
  assertObjectId(userId, "user id");

  return getNotificationsService(
    { userId, role: "student" },
    query
  );
};

export const getNotificationByIdService = async (
  notificationId: string,
  viewer: NotificationViewer
) => {
  assertObjectId(notificationId, "notification id");

  return dbCall(async () => {
    const notification = await Notification.findById(notificationId).populate(
      "userId",
      "name email avatar role"
    );

    if (!notification) {
      throw new AppError("Notification not found", STATUS_CODES.NOT_FOUND);
    }

    assertCanAccessNotification(notification, viewer);

    return notification;
  });
};

export const updateNotificationService = async (
  notificationId: string,
  viewer: NotificationViewer,
  payload: UpdateNotificationPayload
) => {
  assertObjectId(notificationId, "notification id");

  return dbCall(async () => {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      throw new AppError("Notification not found", STATUS_CODES.NOT_FOUND);
    }

    assertCanAccessNotification(notification, viewer);

    if (payload.title !== undefined) {
      notification.title = payload.title.trim();
    }

    if (payload.message !== undefined) {
      notification.message = payload.message.trim();
    }

    if (payload.type !== undefined) {
      notification.type = payload.type;
    }

    if (payload.status !== undefined) {
      notification.isRead = payload.status === "read";
    }

    if (payload.isRead !== undefined) {
      notification.isRead = payload.isRead;
    }

    await notification.save();

    return notification;
  });
};

export const markNotificationReadService = async (
  notificationId: string,
  viewer: NotificationViewer
) => {
  return updateNotificationService(notificationId, viewer, { isRead: true });
};

export const markAllNotificationsReadService = async (userId: string) => {
  assertObjectId(userId, "user id");

  return dbCall(async () => {
    const result = await Notification.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );

    return {
      modifiedCount: result.modifiedCount,
    };
  });
};

export const deleteNotificationService = async (
  notificationId: string,
  viewer: NotificationViewer
) => {
  assertObjectId(notificationId, "notification id");

  return dbCall(async () => {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      throw new AppError("Notification not found", STATUS_CODES.NOT_FOUND);
    }

    assertCanAccessNotification(notification, viewer);

    await notification.deleteOne();

    return notification;
  });
};
