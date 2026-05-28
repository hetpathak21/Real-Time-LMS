import { ICourse } from "./courseTypes";
import { IUser } from "./userTypes";

export interface IAssignment {
  _id: string;
  courseId: ICourse | string;
  teacherId: IUser | string;
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  attachmentUrl?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateAssignmentPayload {
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  attachmentUrl?: string;
  isPublished?: boolean;
}

export interface IUpdateAssignmentPayload {
  title?: string;
  description?: string;
  dueDate?: string;
  totalMarks?: number;
  attachmentUrl?: string;
  isPublished?: boolean;
}

export interface IAssignmentDetails extends IAssignment {
  submissionsCount?: number;
  averageScore?: number;
}
