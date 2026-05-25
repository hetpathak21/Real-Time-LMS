import { IUser } from "./userTypes";

export interface ICourse {
  _id: string;

  title: string;
  description: string;

  thumbnail?: string;

  category?: string;

  tags?: string[];

  isPublished: boolean;

  enrollmentCount: number;

  teacherId: IUser | string;

  createdAt: string;
  updatedAt: string;
}

export interface ICreateCoursePayload {
  title: string;
  description: string;

  thumbnail?: string;

  category?: string;

  tags?: string[];

  level: "beginner" | "intermediate" | "advanced";

  price?: number;
}

export interface IUpdateCoursePayload {
  title?: string;
  description?: string;

  thumbnail?: string;

  category?: string;

  tags?: string[];

  level: "beginner" | "intermediate" | "advanced";

  price?: number;

  isPublished?: boolean;
}

export interface ICourseQuery {
  page?: number;
  limit?: number;

  search?: string;

  category?: string;
}

export interface ICourseListResponse {
  courses: ICourse[];

  meta: {
    page: number;
    limit: number;
    total: number;
  };
}