import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson,
  markLessonComplete,
} from "../../api/lessonApi";

import {
  ILesson,
  ICreateLessonPayload,
  IUpdateLessonPayload,
} from "../../types/lessonTypes";

/* ----------------------------- error helper ----------------------------- */

interface ApiError {
  message: string;
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data?.message || "Something went wrong";
  }

  if (error instanceof Error) return error.message;

  return "Something went wrong";
};

/* -------------------------------------------------------------------------- */
/*                                THUNKS                                      */
/* -------------------------------------------------------------------------- */

/**
 * Get all lessons for a course
 */
export const fetchLessonsByCourse = createAsyncThunk<
  ILesson[],
  string,
  { rejectValue: string }
>("lesson/fetchByCourse", async (courseId, thunkAPI) => {
  try {
    return await getLessonsByCourse(courseId);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/**
 * Get single lesson
 */
export const fetchLessonById = createAsyncThunk<
  ILesson,
  { courseId: string; lessonId: string },
  { rejectValue: string }
>("lesson/fetchById", async ({ courseId, lessonId }, thunkAPI) => {
  try {
    return await getLessonById(courseId, lessonId);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/**
 * Create lesson
 */
export const createLessonThunk = createAsyncThunk<
  ILesson,
  { courseId: string; data: ICreateLessonPayload },
  { rejectValue: string }
>("lesson/create", async ({ courseId, data }, thunkAPI) => {
  try {
    return await createLesson(courseId, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/**
 * Update lesson
 */
export const updateLessonThunk = createAsyncThunk<
  ILesson,
  { courseId: string; lessonId: string; data: IUpdateLessonPayload },
  { rejectValue: string }
>("lesson/update", async ({ courseId, lessonId, data }, thunkAPI) => {
  try {
    return await updateLesson(courseId, lessonId, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/**
 * Delete lesson
 */
export const deleteLessonThunk = createAsyncThunk<
  string,
  { courseId: string; lessonId: string },
  { rejectValue: string }
>("lesson/delete", async ({ courseId, lessonId }, thunkAPI) => {
  try {
    await deleteLesson(courseId, lessonId);
    return lessonId;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/**
 * Mark lesson complete
 */
export const markLessonCompleteThunk = createAsyncThunk<
  ILesson,
  { courseId: string; lessonId: string },
  { rejectValue: string }
>(
  "lesson/complete",
  async ({ courseId, lessonId }, thunkAPI) => {
    try {
      const res = await markLessonComplete(courseId, lessonId);
      return res; 
    } catch {
      return thunkAPI.rejectWithValue("Failed to complete lesson!");
    }
  }
);