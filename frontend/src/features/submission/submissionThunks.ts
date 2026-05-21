import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  submitAssignment,
  getSubmissions,
  getSubmissionById,
  getSubmissionsByAssignment,
  updateSubmission,
  gradeSubmission,
  markUnderReview,
} from "../../api/submissionApi";

import {
  ISubmission,
  ICreateSubmissionPayload,
  IUpdateSubmissionPayload,
} from "../../types/submissionTypes";

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
 * Get all submissions
 */
export const fetchSubmissions = createAsyncThunk<ISubmission[]>(
  "submission/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getSubmissions();
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);

/**
 * Get submission by ID
 */
export const fetchSubmissionById = createAsyncThunk<
  ISubmission,
  string
>("submission/fetchById", async (id, thunkAPI) => {
  try {
    return await getSubmissionById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Get submissions by assignment
 */
export const fetchSubmissionsByAssignment = createAsyncThunk<
  ISubmission[],
  string
>("submission/fetchByAssignment", async (assignmentId, thunkAPI) => {
  try {
    return await getSubmissionsByAssignment(assignmentId);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Student submits assignment
 */
export const submitAssignmentThunk = createAsyncThunk<
  ISubmission,
  ICreateSubmissionPayload
>("submission/submit", async (data, thunkAPI) => {
  try {
    return await submitAssignment(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Update submission (teacher/admin)
 */
export const updateSubmissionThunk = createAsyncThunk<
  ISubmission,
  { id: string; data: IUpdateSubmissionPayload }
>("submission/update", async ({ id, data }, thunkAPI) => {
  try {
    return await updateSubmission(id, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Grade submission
 */
export const gradeSubmissionThunk = createAsyncThunk<
  ISubmission,
  { id: string; marks: number; feedback: string }
>("submission/grade", async ({ id, marks, feedback }, thunkAPI) => {
  try {
    return await gradeSubmission(id, marks, feedback);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

/**
 * Mark under review
 */
export const markUnderReviewThunk = createAsyncThunk<ISubmission, string>(
  "submission/review",
  async (id, thunkAPI) => {
    try {
      return await markUnderReview(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(getError(error));
    }
  }
);