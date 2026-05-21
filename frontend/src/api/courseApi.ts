import axiosInstance from "./axiosInstance";
import {
  ICourse,
  ICreateCoursePayload,
  IUpdateCoursePayload,
  ICourseQuery,
  ICourseDetails,
} from "../types/courseTypes";

/**
 * Create Course (Teacher/Admin)
 */
export const createCourse = async (
  data: ICreateCoursePayload
): Promise<ICourse> => {
  const res = await axiosInstance.post("/courses", data);
  return res.data;
};

/**
 * Get all courses (with optional filters)
 */
export const getAllCourses = async (
  query?: ICourseQuery
): Promise<ICourse[]> => {
  const res = await axiosInstance.get("/courses", {
    params: query,
  });
  return res.data;
};

/**
 * Get course by ID (detailed view)
 */
export const getCourseById = async (
  courseId: string
): Promise<ICourseDetails> => {
  const res = await axiosInstance.get(`/courses/${courseId}`);
  return res.data;
};

/**
 * Update course (Teacher/Admin only)
 */
export const updateCourse = async (
  courseId: string,
  data: IUpdateCoursePayload
): Promise<ICourse> => {
  const res = await axiosInstance.put(`/courses/${courseId}`, data);
  return res.data;
};

/**
 * Delete course (Admin or owner teacher)
 */
export const deleteCourse = async (courseId: string): Promise<void> => {
  await axiosInstance.delete(`/courses/${courseId}`);
};

/**
 * Get courses created by logged-in teacher
 */
export const getMyCourses = async (): Promise<ICourse[]> => {
  const res = await axiosInstance.get("/courses/my");
  return res.data;
};

/**
 * Publish / Unpublish course
 */
export const toggleCoursePublishStatus = async (
  courseId: string
): Promise<ICourse> => {
  const res = await axiosInstance.patch(`/courses/${courseId}/toggle-publish`);
  return res.data;
};

/**
 * Enroll in a course (Student)
 * 🔥 This is key for LMS flow
 */
export const enrollInCourse = async (
  courseId: string
): Promise<{ message: string }> => {
  const res = await axiosInstance.post(`/courses/${courseId}/enroll`);
  return res.data;
};

/**
 * Get enrolled courses (Student dashboard)
 */
export const getEnrolledCourses = async (): Promise<ICourse[]> => {
  const res = await axiosInstance.get("/courses/enrolled/me");
  return res.data;
};