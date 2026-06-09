import axiosInstance from "./axiosInstance";
import {
  IEnrollment,
  IEnrollCoursePayload,
  IUpdateEnrollmentPayload,
  IEnrollmentQuery,
  IEnrollmentDetails,
  IEnrollmentListResponse,
} from "../types/enrollmentTypes";

const emptyEnrollmentMeta = {
  page: 1,
  limit: 10,
  total: 0,
};

const normalizeEnrollmentListResponse = (
  payload: unknown
): IEnrollmentListResponse => {
  if (Array.isArray(payload)) {
    return {
      enrollments: payload as IEnrollment[],
      meta: {
        ...emptyEnrollmentMeta,
        total: payload.length,
      },
    };
  }

  const response = (payload || {}) as Partial<IEnrollmentListResponse>;

  return {
    enrollments: Array.isArray(response.enrollments)
      ? response.enrollments
      : [],
    meta: response.meta || emptyEnrollmentMeta,
  };
};

export const enrollInCourse = async (
  data: IEnrollCoursePayload
): Promise<IEnrollment> => {
  const res = await axiosInstance.post(
    `/enrollment/courses/${data.courseId}/enroll`
  );
  return res.data.data;
};

export const getEnrollments = async (
  query?: IEnrollmentQuery
): Promise<IEnrollment[]> => {
  void query;
  return [];
};

export const getEnrollmentById = async (
  courseId: string
): Promise<IEnrollmentDetails> => {
  const res = await axiosInstance.get(`/enrollment/${courseId}/progress`);
  return res.data.data;
};

export const getMyEnrollments = async (
  query?: IEnrollmentQuery
): Promise<IEnrollment[]> => {
  const res = await axiosInstance.get("/enrollment/my-enrolled-courses", {
    params: query,
  });
  return normalizeEnrollmentListResponse(res.data.data).enrollments;
};

export const updateEnrollment = async (
  courseId: string,
  data: IUpdateEnrollmentPayload
): Promise<IEnrollment> => {
  void data;
  const res = await axiosInstance.patch(`/enrollment/${courseId}/last-accessed`);
  return res.data.data;
};

export const updateProgress = async (
  courseId: string,
  progress: number
): Promise<IEnrollment> => {
  void progress;
  const res = await axiosInstance.get(`/enrollment/${courseId}/progress`);
  return res.data.data;
};

export const dropCourse = async (
  enrollmentId: string
): Promise<IEnrollment> => {
  void enrollmentId;
  throw new Error("Drop course endpoint is not available yet");
};

export const completeCourse = async (
  courseId: string
): Promise<IEnrollment> => {
  const res = await axiosInstance.get(`/enrollment/${courseId}/progress`);
  return res.data.data;
};
