import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  getAllCourses,
  getCourseById,
  getMyCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  toggleCoursePublishStatus,
} from "../../api/courseApi";

import {
  ICourse,
  ICreateCoursePayload,
  IUpdateCoursePayload,
} from "../../types/courseTypes";

/**
 * Error extractor (strict + reusable)
 */
interface ApiErrorResponse {
  message: string;
}

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message || "Something went wrong";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

/**
 * Get all courses (student view)
 */
export const fetchAllCourses = createAsyncThunk<ICourse[]>(
  "course/fetchAllCourses",
  async (_, thunkAPI) => {
    try {
      return await getAllCourses();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * Get course by ID
 */
export const fetchCourseById = createAsyncThunk<ICourse, string>(
  "course/fetchCourseById",
  async (courseId, thunkAPI) => {
    try {
      return await getCourseById(courseId);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * Get teacher's courses
 */
export const fetchMyCourses = createAsyncThunk<ICourse[]>(
  "course/fetchMyCourses",
  async (_, thunkAPI) => {
    try {
      return await getMyCourses();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * Create course
 */
export const createCourseThunk = createAsyncThunk<
  ICourse,
  ICreateCoursePayload
>("course/createCourse", async (data, thunkAPI) => {
  try {
    return await createCourse(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

/**
 * Update course
 */
export const updateCourseThunk = createAsyncThunk<
  ICourse,
  { courseId: string; data: IUpdateCoursePayload }
>("course/updateCourse", async ({ courseId, data }, thunkAPI) => {
  try {
    return await updateCourse(courseId, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

/**
 * Delete course
 */
export const deleteCourseThunk = createAsyncThunk<string, string>(
  "course/deleteCourse",
  async (courseId, thunkAPI) => {
    try {
      await deleteCourse(courseId);
      return courseId;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * Toggle publish/unpublish course
 */
export const togglePublishCourseThunk = createAsyncThunk<ICourse, string>(
  "course/togglePublish",
  async (courseId, thunkAPI) => {
    try {
      return await toggleCoursePublishStatus(courseId);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);