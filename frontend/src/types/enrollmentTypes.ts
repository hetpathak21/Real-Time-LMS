import { IUser } from "./userTypes";
import { ICourse } from "./courseTypes";

/**
 * Enrollment Status
 */
export type EnrollmentStatus = "active" | "completed" | "dropped";

/**
 * Core Enrollment Entity
 */
export interface IEnrollment {
  _id: string;

  student: IUser | string;

  course: ICourse | string;

  status: EnrollmentStatus;

  /**
   * Progress tracking (0–100%)
   */
  progress: number;

  enrolledAt: string;
  completedAt?: string;

  createdAt: string;
  updatedAt: string;
}

/**
 * Enroll in course payload
 */
export interface IEnrollCoursePayload {
  courseId: string;
}

/**
 * Update enrollment (progress/status updates)
 */
export interface IUpdateEnrollmentPayload {
  status?: EnrollmentStatus;
  progress?: number;
}

/**
 * Enrollment Query Filters
 */
export interface IEnrollmentQuery {
  studentId?: string;
  courseId?: string;
  status?: EnrollmentStatus;
}

/**
 * Detailed Enrollment View
 */
export interface IEnrollmentDetails extends IEnrollment {
  student: IUser;
  course: ICourse;
}