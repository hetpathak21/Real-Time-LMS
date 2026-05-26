// import axiosInstance from "./axiosInstance";
// import {
//   ICourse,
//   ICreateCoursePayload,
//   IUpdateCoursePayload,
//   ICourseQuery,
//   ICourseDetails,
//   ICourseListResponse,
// } from "../types/courseTypes";

// const emptyMeta = {
//   page: 1,
//   limit: 10,
//   total: 0,
// };

// const normalizeCourseListResponse = (payload: unknown): ICourseListResponse => {
//   if (Array.isArray(payload)) {
//     return {
//       courses: payload as ICourse[],
//       meta: {
//         ...emptyMeta,
//         total: payload.length,
//         limit: payload.length || emptyMeta.limit,
//       },
//     };
//   }

//   const response = (payload || {}) as Partial<ICourseListResponse>;

//   return {
//     courses: Array.isArray(response.courses) ? response.courses : [],
//     meta: response.meta
//       ? {
//           page: Number(response.meta.page) || emptyMeta.page,
//           limit: Number(response.meta.limit) || emptyMeta.limit,
//           total: Number(response.meta.total) || 0,
//         }
//       : emptyMeta,
//   };
// };

// /**
//  * Create Course
//  */
// export const createCourse = async (
//   data: ICreateCoursePayload
// ): Promise<ICourse> => {
//   const res = await axiosInstance.post("/course", data);
//   return res.data.data; // important if using sendResponse
// };

// /**
//  * Get published courses (public)
//  */
// export const getAllCourses = async (
//   query?: ICourseQuery
// ): Promise<ICourseListResponse> => {
//   const res = await axiosInstance.get("/course", {
//     params: query,
//   });
//   return normalizeCourseListResponse(res.data.data);
// };

// /**
//  * Get course by ID
//  */
// export const getCourseById = async (
//   courseId: string
// ): Promise<ICourseDetails> => {
//   const res = await axiosInstance.get(`/course/${courseId}`);
//   return res.data.data;
// };

// /**
//  * Update course
//  */
// export const updateCourse = async (
//   courseId: string,
//   data: IUpdateCoursePayload
// ): Promise<ICourse> => {
//   const res = await axiosInstance.put(`/course/${courseId}`, data);
//   return res.data.data;
// };

// /**
//  * Delete course
//  */
// export const deleteCourse = async (courseId: string): Promise<void> => {
//   await axiosInstance.delete(`/course/${courseId}`);
// };

// /**
//  * Teacher courses
//  */
// export const getMyCourses = async (
//   query?: ICourseQuery
// ): Promise<ICourseListResponse> => {
//   const res = await axiosInstance.get("/course/my-courses", {
//     params: query,
//   });
//   return normalizeCourseListResponse(res.data.data);
// };

// /**
//  * Publish course
//  */
// export const publishCourse = async (courseId: string): Promise<ICourse> => {
//   const res = await axiosInstance.patch(`/course/${courseId}/publish`);
//   return res.data.data;
// };

// /**
//  * Unpublish course
//  */
// export const unpublishCourse = async (courseId: string): Promise<ICourse> => {
//   const res = await axiosInstance.patch(`/course/${courseId}/unpublish`);
//   return res.data.data;
// };



import axiosInstance from "./axiosInstance";
import {
  ICourse,
  ICreateCoursePayload,
  IUpdateCoursePayload,
  ICourseQuery,
  ICourseDetails,
  ICourseListResponse,
} from "../types/courseTypes";

const emptyMeta = {
  page: 1,
  limit: 10,
  total: 0,
};

const normalizeCourseListResponse = (
  payload: unknown
): ICourseListResponse => {
  if (Array.isArray(payload)) {
    return {
      courses: payload as ICourse[],
      meta: {
        ...emptyMeta,
        total: payload.length,
        limit: payload.length || emptyMeta.limit,
      },
    };
  }

  const response = (payload || {}) as Partial<ICourseListResponse>;

  return {
    courses: Array.isArray(response.courses) ? response.courses : [],
    meta: response.meta
      ? {
          page: Number(response.meta.page) || emptyMeta.page,
          limit: Number(response.meta.limit) || emptyMeta.limit,
          total: Number(response.meta.total) || 0,
        }
      : emptyMeta,
  };
};

const buildCourseFormData = (
  data: ICreateCoursePayload | IUpdateCoursePayload
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, value as string | Blob);
  });

  return formData;
};

/**
 * Create Course
 */
export const createCourse = async (
  data: ICreateCoursePayload
): Promise<ICourse> => {
  const formData = buildCourseFormData(data);

  const res = await axiosInstance.post("/course", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};

/**
 * Get published courses
 */
export const getAllCourses = async (
  query?: ICourseQuery
): Promise<ICourseListResponse> => {
  const res = await axiosInstance.get("/course", {
    params: query,
  });

  return normalizeCourseListResponse(res.data.data);
};

/**
 * Get course by ID
 */
export const getCourseById = async (
  courseId: string
): Promise<ICourseDetails> => {
  const res = await axiosInstance.get(`/course/${courseId}`);
  return res.data.data;
};

/**
 * Update Course
 */
export const updateCourse = async (
  courseId: string,
  data: IUpdateCoursePayload
): Promise<ICourse> => {
  const formData = buildCourseFormData(data);

  const res = await axiosInstance.put(
    `/course/${courseId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.data;
};

/**
 * Delete Course
 */
export const deleteCourse = async (
  courseId: string
): Promise<void> => {
  await axiosInstance.delete(`/course/${courseId}`);
};

/**
 * My Courses
 */
export const getMyCourses = async (
  query?: ICourseQuery
): Promise<ICourseListResponse> => {
  const res = await axiosInstance.get("/course/my-courses", {
    params: query,
  });

  return normalizeCourseListResponse(res.data.data);
};

/**
 * Publish Course
 */
export const publishCourse = async (
  courseId: string
): Promise<ICourse> => {
  const res = await axiosInstance.patch(
    `/course/${courseId}/publish`
  );

  return res.data.data;
};

/**
 * Unpublish Course
 */
export const unpublishCourse = async (
  courseId: string
): Promise<ICourse> => {
  const res = await axiosInstance.patch(
    `/course/${courseId}/unpublish`
  );

  return res.data.data;
};
