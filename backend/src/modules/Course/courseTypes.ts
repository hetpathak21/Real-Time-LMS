export interface CreateCoursePayload {
  title: string;
  description: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
}

export interface UpdateCoursePayload {
  title?: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
}

export interface CourseQuery {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}