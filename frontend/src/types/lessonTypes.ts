import { IUser } from "./userTypes";

/**
 * Lesson Type (expandable for LMS flexibility)
 */
export type LessonType = "video" | "text" | "pdf" | "quiz";

/**
 * Core Lesson Interface
 */
export interface ILesson {
  _id: string;

  title: string;
  description?: string;

  type: LessonType;

  /**
   * Main content can vary based on type:
   * - video → URL
   * - pdf → file URL
   * - text → rich text / markdown
   * - quiz → quiz reference ID
   */
  content: string;

  /**
   * Order inside course (important for LMS flow)
   */
  order: number;

  /**
   * Parent course reference
   */
  course: string;

  /**
   * Optional duration (for video lessons)
   */
  duration?: number; // in minutes

  /**
   * Completion tracking
   */
  isPreview?: boolean;

  createdBy?: IUser | string;

  createdAt: string;
  updatedAt: string;
}

/**
 * Create Lesson Payload
 */
export interface ICreateLessonPayload {
  title: string;
  description?: string;
  type: LessonType;
  content: string;
  order?: number;
  duration?: number;
  isPreview?: boolean;
}

/**
 * Update Lesson Payload
 */
export interface IUpdateLessonPayload {
  title?: string;
  description?: string;
  type?: LessonType;
  content?: string;
  order?: number;
  duration?: number;
  isPreview?: boolean;
}

/**
 * Lesson Progress (for student tracking)
 */
export interface ILessonProgress {
  lessonId: string;
  userId: string;
  isCompleted: boolean;
  completedAt?: string;
}