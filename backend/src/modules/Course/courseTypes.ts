export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface CreateCoursePayload {
  title: string;
  description: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  price: number;
  level: CourseLevel;
}

export interface UpdateCoursePayload {
  title?: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  price?: number;
  level?: CourseLevel;
}

export interface CourseQuery {
  search?: string;
  category?: string;
  level?: CourseLevel;
  page?: number;
  limit?: number;
}