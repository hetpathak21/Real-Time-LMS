import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  getAssignmentById,
  getAssignmentsByCourse,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  publishAssignment,
  closeAssignment,
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

/**
 * Get assignment by ID
 */
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

/**
 * Get assignments by course
 */
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

/**
 * Create assignment
 */
export const createAssignmentThunk = createAsyncThunk<
  IAssignment,
  ICreateAssignmentPayload
>("assignment/create", async (data, thunkAPI) => {
  try {
    return await createAssignment(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Update assignment
 */
export const updateAssignmentThunk = createAsyncThunk<
  IAssignment,
  { id: string; data: IUpdateAssignmentPayload }
>("assignment/update", async ({ id, data }, thunkAPI) => {
  try {
    return await updateAssignment(id, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Delete assignment
 */
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

/**
 * Publish assignment
 */
export const publishAssignmentThunk = createAsyncThunk<
  IAssignment,
  string
>("assignment/publish", async (id, thunkAPI) => {
  try {
    return await publishAssignment(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Close assignment
 */
export const closeAssignmentThunk = createAsyncThunk<
  IAssignment,
  string
>("assignment/close", async (id, thunkAPI) => {
  try {
    return await closeAssignment(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});