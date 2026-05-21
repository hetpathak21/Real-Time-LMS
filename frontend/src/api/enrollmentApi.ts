import axiosInstance from "./axiosInstance";
import {
  IEnrollment,
  IEnrollCoursePayload,
  IUpdateEnrollmentPayload,
  IEnrollmentQuery,
  IEnrollmentDetails,
} from "../types/enrollmentTypes";

/**
 * Enroll student in course
 */
export const enrollInCourse = async (
  data: IEnrollCoursePayload
): Promise<IEnrollment> => {
  const res = await axiosInstance.post("/enrollments", data);
  return res.data;
};

/**
 * Get all enrollments (Admin/Teacher)
 */
export const getEnrollments = async (
  query?: IEnrollmentQuery
): Promise<IEnrollment[]> => {
  const res = await axiosInstance.get("/enrollments", {
    params: query,
  });
  return res.data;
};

/**
 * Get enrollment by ID
 */
export const getEnrollmentById = async (
  enrollmentId: string
): Promise<IEnrollmentDetails> => {
  const res = await axiosInstance.get(`/enrollments/${enrollmentId}`);
  return res.data;
};

/**
 * Get my enrolled courses (Student dashboard)
 */
export const getMyEnrollments = async (): Promise<IEnrollment[]> => {
  const res = await axiosInstance.get("/enrollments/me");
  return res.data;
};

/**
 * Update enrollment (progress/status)
 */
export const updateEnrollment = async (
  enrollmentId: string,
  data: IUpdateEnrollmentPayload
): Promise<IEnrollment> => {
  const res = await axiosInstance.put(
    `/enrollments/${enrollmentId}`,
    data
  );
  return res.data;
};

/**
 * Update course progress (important for LMS tracking)
 */
export const updateProgress = async (
  enrollmentId: string,
  progress: number
): Promise<IEnrollment> => {
  const res = await axiosInstance.patch(
    `/enrollments/${enrollmentId}/progress`,
    { progress }
  );
  return res.data;
};

/**
 * Drop course (Student action)
 */
export const dropCourse = async (
  enrollmentId: string
): Promise<IEnrollment> => {
  const res = await axiosInstance.patch(
    `/enrollments/${enrollmentId}/drop`
  );
  return res.data;
};

/**
 * Complete course manually (or system trigger)
 */
export const completeCourse = async (
  enrollmentId: string
): Promise<IEnrollment> => {
  const res = await axiosInstance.patch(
    `/enrollments/${enrollmentId}/complete`
  );
  return res.data;
};