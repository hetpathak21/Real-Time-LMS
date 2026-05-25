import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createLesson,
  deleteLesson,
  getLessonById,
  getLessonsByCourse,
  updateLesson,
} from "../../api/lessonApi";
import {
  ICreateLessonPayload,
  ILesson,
  IUpdateLessonPayload,
} from "../../types/lessonTypes";

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

export const fetchLessonsByCourse = createAsyncThunk<ILesson[], string>(
  "lesson/fetchLessonsByCourse",
  async (courseId, thunkAPI) => {
    try {
      return await getLessonsByCourse(courseId);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const fetchLessonById = createAsyncThunk<ILesson, string>(
  "lesson/fetchLessonById",
  async (lessonId, thunkAPI) => {
    try {
      return await getLessonById(lessonId);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const createLessonThunk = createAsyncThunk<
  ILesson,
  { courseId: string; data: ICreateLessonPayload }
>("lesson/createLesson", async ({ courseId, data }, thunkAPI) => {
  try {
    return await createLesson(courseId, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

export const updateLessonThunk = createAsyncThunk<
  ILesson,
  { lessonId: string; data: IUpdateLessonPayload }
>("lesson/updateLesson", async ({ lessonId, data }, thunkAPI) => {
  try {
    return await updateLesson(lessonId, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

export const deleteLessonThunk = createAsyncThunk<string, string>(
  "lesson/deleteLesson",
  async (lessonId, thunkAPI) => {
    try {
      await deleteLesson(lessonId);
      return lessonId;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);
