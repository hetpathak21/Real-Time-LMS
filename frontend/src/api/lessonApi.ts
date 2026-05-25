import axiosInstance from "./axiosInstance";
import {
  ICreateLessonPayload,
  ILesson,
  IUpdateLessonPayload,
} from "../types/lessonTypes";

export const createLesson = async (
  courseId: string,
  data: ICreateLessonPayload
): Promise<ILesson> => {
  const res = await axiosInstance.post(`/lesson/${courseId}/lessons`, data);
  return res.data.data;
};

export const getLessonsByCourse = async (
  courseId: string
): Promise<ILesson[]> => {
  const res = await axiosInstance.get(`/lesson/${courseId}/lessons`);
  return res.data.data;
};

export const getLessonById = async (lessonId: string): Promise<ILesson> => {
  const res = await axiosInstance.get(`/lesson/lessons/${lessonId}`);
  return res.data.data;
};

export const updateLesson = async (
  lessonId: string,
  data: IUpdateLessonPayload
): Promise<ILesson> => {
  const res = await axiosInstance.put(`/lesson/lessons/${lessonId}`, data);
  return res.data.data;
};

export const deleteLesson = async (lessonId: string): Promise<void> => {
  await axiosInstance.delete(`/lesson/lessons/${lessonId}`);
};
