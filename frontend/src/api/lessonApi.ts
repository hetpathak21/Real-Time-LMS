import axiosInstance from "./axiosInstance";
import { ILesson } from "../types/lessonTypes";

/**
 * Create a lesson under a course (Teacher/Admin)
 */
export const createLesson = async (
  courseId: string,
  data: Partial<ILesson>
): Promise<ILesson> => {
  const res = await axiosInstance.post(
    `/courses/${courseId}/lessons`,
    data
  );
  return res.data;
};

/**
 * Get all lessons for a course (ordered)
 */
export const getLessonsByCourse = async (
  courseId: string
): Promise<ILesson[]> => {
  const res = await axiosInstance.get(`/courses/${courseId}/lessons`);
  return res.data;
};

/**
 * Get single lesson details
 */
export const getLessonById = async (
  courseId: string,
  lessonId: string
): Promise<ILesson> => {
  const res = await axiosInstance.get(
    `/courses/${courseId}/lessons/${lessonId}`
  );
  return res.data;
};

/**
 * Update lesson (Teacher/Admin)
 */
export const updateLesson = async (
  courseId: string,
  lessonId: string,
  data: Partial<ILesson>
): Promise<ILesson> => {
  const res = await axiosInstance.put(
    `/courses/${courseId}/lessons/${lessonId}`,
    data
  );
  return res.data;
};

/**
 * Delete lesson (Teacher/Admin)
 */
export const deleteLesson = async (
  courseId: string,
  lessonId: string
): Promise<void> => {
  await axiosInstance.delete(
    `/courses/${courseId}/lessons/${lessonId}`
  );
};

/**
 * Reorder lessons inside a course (important for LMS flow)
 */
export const reorderLessons = async (
  courseId: string,
  orderedLessonIds: string[]
): Promise<ILesson[]> => {
  const res = await axiosInstance.patch(
    `/courses/${courseId}/lessons/reorder`,
    { orderedLessonIds }
  );
  return res.data;
};

/**
 * Mark lesson as completed (Student progress tracking)
 */
export const markLessonComplete = async (
  courseId: string,
  lessonId: string
): Promise<ILesson> => {
  const res = await axiosInstance.post(
    `/courses/${courseId}/lessons/${lessonId}/complete`
  );

  return res.data; 
};