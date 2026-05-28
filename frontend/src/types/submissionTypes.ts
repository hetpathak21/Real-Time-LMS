import { IUser } from "./userTypes";
import { IAssignment } from "./assignmentTypes";

export type SubmissionStatus = "submitted" | "reviewed" | "graded";

export interface ISubmission {
  _id: string;
  assignmentId: IAssignment | string;
  studentId: IUser | string;
  fileUrl?: string;
  textAnswer?: string;
  status: SubmissionStatus;
  grade?: number;
  feedback?: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSubmissionPayload {
  assignmentId: string;
  textAnswer?: string;
  fileUrl?: string;
}

export interface IUpdateSubmissionPayload {
  status?: SubmissionStatus;
  grade?: number;
  feedback?: string;
}

export interface ISubmissionQuery {
  assignmentId?: string;
  studentId?: string;
  status?: SubmissionStatus;
}

export interface ISubmissionDetails extends ISubmission {
  assignmentId: IAssignment;
  studentId: IUser;
}
