import { ICourse } from "./courseTypes";

export type LessonType = "video" | "text" | "pdf" | "link";

export interface ILesson {
  _id: string;
  courseId: string | Pick<ICourse, "_id" | "title" | "teacherId" | "isPublished">;
  title: string;
  type: LessonType;
  contentUrl?: string;
  order: number;
  duration?: number;
  isPreview: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateLessonPayload {
  title: string;
  type: LessonType;
  contentUrl?: string;
  content?: File | null;
  order?: number;
  duration?: number;
  isPreview?: boolean;
}

export interface IUpdateLessonPayload {
  title?: string;
  type?: LessonType;
  contentUrl?: string;
  content?: File | null;
  order?: number;
  duration?: number;
  isPreview?: boolean;
}
