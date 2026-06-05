import axiosInstance from "./axiosInstance";
import {
  ICreateLessonPayload,
  ILesson,
  IUpdateLessonPayload,
} from "../types/lessonTypes";

const buildLessonRequestBody = (
  data: ICreateLessonPayload | IUpdateLessonPayload | FormData
) => {
  if (data instanceof FormData) {
    return data;
  }

  if (!data.content) {
    return data;
  }

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (typeof value === "boolean") {
      if (value) {
        formData.append(key, "true");
      }
      return;
    }

    formData.append(key, value as string | Blob);
  });

  return formData;
};

export const createLesson = async (
  courseId: string,
  data: ICreateLessonPayload | FormData
): Promise<ILesson> => {
  const body = buildLessonRequestBody(data);
  const res = await axiosInstance.post(`/lesson/${courseId}/lessons`, body);
  return res.data.data;
};

export const getLessonsByCourse = async (
  courseId: string
): Promise<ILesson[]> => {
  const res = await axiosInstance.get(`/lesson/${courseId}/lessons`);
  return res.data.data;
};

export const getLessonById = async (lessonId: string): Promise<ILesson> => {
  const res = await axiosInstance.get(`/lesson/${lessonId}`);
  return res.data.data;
};

export const updateLesson = async (
  lessonId: string,
  data: IUpdateLessonPayload | FormData
): Promise<ILesson> => {
  const body = buildLessonRequestBody(data);
  const res = await axiosInstance.put(`/lesson/${lessonId}`, body);
  return res.data.data;
};

export const deleteLesson = async (lessonId: string): Promise<void> => {
  await axiosInstance.delete(`/lesson/${lessonId}`);
};
