import { IUser } from "./userTypes";
import { IAssignment } from "./assignmentTypes";

/**
 * Submission Status Lifecycle
 */
export type SubmissionStatus =
  | "pending"
  | "submitted"
  | "under_review"
  | "graded"
  | "rejected";

/**
 * Core Submission Entity
 */
export interface ISubmission {
  _id: string;

  assignment: IAssignment | string;

  student: IUser | string;

  /**
   * Student submission content
   * Can be text answer or file URL
   */
  content?: string;

  /**
   * Uploaded files (if any)
   */
  attachments?: string[];

  status: SubmissionStatus;

  /**
   * Teacher grading
   */
  marksObtained?: number;
  totalMarks?: number;

  feedback?: string;

  submittedAt?: string;
  gradedAt?: string;

  createdAt: string;
  updatedAt: string;
}

/**
 * Create Submission Payload (Student)
 */
export interface ICreateSubmissionPayload {
  assignmentId: string;
  content?: string;
  attachments?: string[];
}

/**
 * Update Submission Payload (Teacher evaluation)
 */
export interface IUpdateSubmissionPayload {
  status?: SubmissionStatus;
  marksObtained?: number;
  feedback?: string;
}

/**
 * Submission Query Filters
 */
export interface ISubmissionQuery {
  assignmentId?: string;
  studentId?: string;
  status?: SubmissionStatus;
}

/**
 * Submission Details View
 */
export interface ISubmissionDetails extends ISubmission {
  assignment: IAssignment;
  student: IUser;
}