import { ILesson } from "./lessonTypes";
import { IUser } from "./userTypes";

export interface ICourseListMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ICourse {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;

  category?: string;
  level:string;
  tags?: string[];
  isPublished: boolean;
  enrollmentCount?: number;
  teacherId?: IUser | string;
  instructor?: IUser | string;
  students?: (IUser | string)[];
  lessons?: (ILesson | string)[];
  price?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateCoursePayload {
  title: string;
  description: string;

  thumbnail?: string | File;

  category?: string;
  level: string;
  price?: number;
  tags?: string[];
}

export interface IUpdateCoursePayload {
  title?: string;
  description?: string;

  thumbnail?: string | File;

  category?: string;
  price?: number;

  isPublished?: boolean;
  tags?: string[];
}

export interface ICourseQuery {
  search?: string;

  category?: string;
  instructorId?: string;
  isPublished?: boolean;
  page?: number;
  limit?: number;
}

export interface ICourseListResponse {
  courses: ICourse[];
  meta: ICourseListMeta;
}

export interface ICourseDetails extends Omit<
  ICourse,
  "teacherId" | "instructor" | "students" | "lessons"
> {
  teacherId?: IUser | string;
  instructor?: IUser | string;
  students?: IUser[];
  lessons?: ILesson[];
}
