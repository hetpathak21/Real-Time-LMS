import { IUser } from "./userTypes";
import { ILesson } from "./lessonTypes";

/**
 * Course Level Type
 */
export type CourseLevel = "beginner" | "intermediate" | "advanced";

/**
 * Core Course Entity
 */
export interface ICourse {
  _id: string;

  title: string;
  description: string;

  thumbnail?: string;
  category?: string;

  level: CourseLevel;

  isPublished: boolean;

  price?: number;

  instructor: IUser | string;

  students: (IUser | string)[];

  lessons: (ILesson | string)[];

  createdAt: string;
  updatedAt: string;
}

/**
 * Course Creation Payload (Teacher/Admin)
 */
export interface ICreateCoursePayload {
  title: string;
  description: string;
  thumbnail?: string;
  category?: string;
  level: CourseLevel;
  price?: number;
}

/**
 * Course Update Payload (Partial updates allowed)
 */
export interface IUpdateCoursePayload {
  title?: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  level?: CourseLevel;
  price?: number;
  isPublished?: boolean;
}

/**
 * Course Query (filters for browsing/searching)
 */
export interface ICourseQuery {
  search?: string;
  category?: string;
  level?: CourseLevel;
  instructorId?: string;
  isPublished?: boolean;
}

/**
 * Course Details Page (fully populated view)
 */
export interface ICourseDetails extends Omit<ICourse, "instructor" | "students" | "lessons"> {
  instructor: IUser;
  students: IUser[];
  lessons: ILesson[];
}