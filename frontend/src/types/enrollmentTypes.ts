import { IUser } from "./userTypes";
import { ICourse } from "./courseTypes";

export interface IEnrollment {
  _id: string;
  studentId: IUser | string;
  courseId: ICourse | string;
  progress: number;
  completed: boolean;
  lastAccessedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEnrollCoursePayload {
  courseId: string;
}

export interface IUpdateEnrollmentPayload {
  progress?: number;
  completed?: boolean;
}

export interface IEnrollmentQuery {
  page?: number;
  limit?: number;
}

export interface IEnrollmentListResponse {
  enrollments: IEnrollment[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface IEnrollmentDetails extends IEnrollment {
  studentId: IUser;
  courseId: ICourse;
}
