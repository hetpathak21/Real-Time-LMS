import { IUser } from "./userTypes";
import { ICourse } from "./courseTypes";

/**
 * Assignment Status (for lifecycle tracking)
 */
export type AssignmentStatus = "draft" | "published" | "closed";

/**
 * Core Assignment Interface
 */
export interface IAssignment {
  _id: string;

  title: string;
  description: string;

  course: ICourse | string;

  /**
   * Optional attachments (PDFs, docs, etc.)
   */
  attachments?: string[];

  /**
   * Deadline for submission
   */
  dueDate: string;

  status: AssignmentStatus;

  totalMarks: number;

  createdBy: IUser | string;

  createdAt: string;
  updatedAt: string;
}

/**
 * Create Assignment Payload
 */
export interface ICreateAssignmentPayload {
  title: string;
  description: string;
  course: string;
  attachments?: string[];
  dueDate: string;
  totalMarks: number;
}

/**
 * Update Assignment Payload
 */
export interface IUpdateAssignmentPayload {
  title?: string;
  description?: string;
  attachments?: string[];
  dueDate?: string;
  status?: AssignmentStatus;
  totalMarks?: number;
}

/**
 * Assignment Query Filters
 */
export interface IAssignmentQuery {
  courseId?: string;
  status?: AssignmentStatus;
  search?: string;
}

/**
 * Assignment View (for details page)
 */
export interface IAssignmentDetails extends IAssignment {
  submissionsCount?: number;
  averageScore?: number;
}