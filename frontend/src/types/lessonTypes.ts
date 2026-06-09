import { ICourse } from "./courseTypes";

export type LessonType = "video" | "text" | "pdf" | "document" | "link";

export interface ILesson {
  _id: string;
  courseId: string | Pick<ICourse, "_id" | "title" | "teacherId" | "isPublished">;
  title: string;
  type: LessonType;
  contentUrl?: string;
  textContent?: string;
  fileName?: string;
  mimeType?: string;
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
  textContent?: string;
  content?: File | null;
  order?: number;
  duration?: number;
  isPreview?: boolean;
}

export interface IUpdateLessonPayload {
  title?: string;
  type?: LessonType;
  contentUrl?: string;
  textContent?: string;
  content?: File | null;
  order?: number;
  duration?: number;
  isPreview?: boolean;
}
