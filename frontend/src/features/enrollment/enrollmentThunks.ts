import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  enrollInCourse,
  getEnrollments,
  getMyEnrollments,
  getEnrollmentById,
  updateEnrollment,
  updateProgress,
  dropCourse,
  completeCourse,
} from "../../api/enrollmentApi";

import {
  IEnrollment,
  IEnrollCoursePayload,
  IUpdateEnrollmentPayload,
} from "../../types/enrollmentTypes";

interface ApiError {
  message: string;
}

const getError = (error: unknown): string => {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data?.message || "Something went wrong";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

/**
 * Get all enrollments (admin/teacher)
 */
export const fetchEnrollments = createAsyncThunk<IEnrollment[]>(
  "enrollment/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getEnrollments();
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);

/**
 * Get my enrollments (student)
 */
export const fetchMyEnrollments = createAsyncThunk<IEnrollment[]>(
  "enrollment/fetchMine",
  async (_, thunkAPI) => {
    try {
      return await getMyEnrollments();
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);

/**
 * Get enrollment by ID
 */
export const fetchEnrollmentById = createAsyncThunk<
  IEnrollment,
  string
>("enrollment/fetchById", async (id, thunkAPI) => {
  try {
    return await getEnrollmentById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Enroll in course
 */
export const enrollInCourseThunk = createAsyncThunk<
  IEnrollment,
  IEnrollCoursePayload
>("enrollment/enroll", async (data, thunkAPI) => {
  try {
    return await enrollInCourse(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Update enrollment
 */
export const updateEnrollmentThunk = createAsyncThunk<
  IEnrollment,
  { id: string; data: IUpdateEnrollmentPayload }
>("enrollment/update", async ({ id, data }, thunkAPI) => {
  try {
    return await updateEnrollment(id, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Update progress
 */
export const updateProgressThunk = createAsyncThunk<
  IEnrollment,
  { id: string; progress: number }
>("enrollment/progress", async ({ id, progress }, thunkAPI) => {
  try {
    return await updateProgress(id, progress);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Drop course
 */
export const dropCourseThunk = createAsyncThunk<string, string>(
  "enrollment/drop",
  async (id, thunkAPI) => {
    try {
      await dropCourse(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);

/**
 * Complete course
 */
export const completeCourseThunk = createAsyncThunk<IEnrollment, string>(
  "enrollment/complete",
  async (id, thunkAPI) => {
    try {
      return await completeCourse(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);