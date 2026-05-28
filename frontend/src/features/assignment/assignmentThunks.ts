import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  getAssignmentById,
  getAssignmentsByCourse,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  setAssignmentPublishStatus,
} from "../../api/assignmentApi";

import {
  IAssignment,
  ICreateAssignmentPayload,
  IUpdateAssignmentPayload,
} from "../../types/assignmentTypes";

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

export const fetchAssignmentById = createAsyncThunk<
  IAssignment,
  string
>("assignment/fetchById", async (id, thunkAPI) => {
  try {
    return await getAssignmentById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const fetchAssignmentsByCourse = createAsyncThunk<
  IAssignment[],
  string
>("assignment/fetchByCourse", async (courseId, thunkAPI) => {
  try {
    return await getAssignmentsByCourse(courseId);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const createAssignmentThunk = createAsyncThunk<
  IAssignment,
  { courseId: string; data: ICreateAssignmentPayload }
>("assignment/create", async ({ courseId, data }, thunkAPI) => {
  try {
    return await createAssignment(courseId, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const updateAssignmentThunk = createAsyncThunk<
  IAssignment,
  { assignmentId: string; data: IUpdateAssignmentPayload }
>("assignment/update", async ({ assignmentId, data }, thunkAPI) => {
  try {
    return await updateAssignment(assignmentId, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const deleteAssignmentThunk = createAsyncThunk<string, string>(
  "assignment/delete",
  async (id, thunkAPI) => {
    try {
      await deleteAssignment(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);

export const publishAssignmentThunk = createAsyncThunk<
  IAssignment,
  { assignmentId: string; isPublished: boolean }
>("assignment/publish", async ({ assignmentId, isPublished }, thunkAPI) => {
  try {
    return await setAssignmentPublishStatus(assignmentId, isPublished);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});
