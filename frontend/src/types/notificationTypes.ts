import { IUser } from "./userTypes";

/**
 * Notification Types (LMS Events)
 */
export type NotificationType =
  | "assignment_created"
  | "assignment_submitted"
  | "assignment_graded"
  | "course_enrolled"
  | "course_completed"
  | "lesson_completed"
  | "system_alert";

/**
 * Notification Status
 */
export type NotificationStatus = "unread" | "read";

/**
 * Core Notification Entity
 */
export interface INotification {
  _id: string;

  recipient: IUser | string;

  sender?: IUser | string;

  type: NotificationType;

  title: string;
  message: string;

  status: NotificationStatus;

  /**
   * Optional reference IDs (for navigation)
   */
  courseId?: string;
  assignmentId?: string;
  submissionId?: string;
  lessonId?: string;

  createdAt: string;
  updatedAt: string;
}

/**
 * Create Notification Payload (system/internal use)
 */
export interface ICreateNotificationPayload {
  recipient: string;
  sender?: string;
  type: NotificationType;
  title: string;
  message: string;

  courseId?: string;
  assignmentId?: string;
  submissionId?: string;
  lessonId?: string;
}

/**
 * Notification Query Filters
 */
export interface INotificationQuery {
  recipientId?: string;
  status?: NotificationStatus;
  type?: NotificationType;
}

/**
 * Notification Details View
 */
export interface INotificationDetails extends INotification {
  recipient: IUser;
  sender?: IUser;
}