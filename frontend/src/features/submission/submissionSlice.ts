import { createSlice } from "@reduxjs/toolkit";
import { ISubmission } from "../../types/submissionTypes";

import {
  fetchSubmissions,
  fetchSubmissionById,
  fetchSubmissionsByAssignment,
  submitAssignmentThunk,
  updateSubmissionThunk,
  gradeSubmissionThunk,
  markUnderReviewThunk,
} from "./submissionThunks";

interface SubmissionState {
  submissions: ISubmission[];
  assignmentSubmissions: ISubmission[];
  selectedSubmission: ISubmission | null;

  loading: boolean;
  error: string | null;
}

const initialState: SubmissionState = {
  submissions: [],
  assignmentSubmissions: [],
  selectedSubmission: null,

  loading: false,
  error: null,
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    clearSelectedSubmission: (state) => {
      state.selectedSubmission = null;
    },

    clearSubmissionError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // 📚 All submissions
    builder.addCase(fetchSubmissions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSubmissions.fulfilled, (state, action) => {
      state.loading = false;
      state.submissions = action.payload;
    });
    builder.addCase(fetchSubmissions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // 📄 Single submission
    builder.addCase(fetchSubmissionById.fulfilled, (state, action) => {
      state.selectedSubmission = action.payload;
    });

    // 📘 Assignment-wise submissions
    builder.addCase(
      fetchSubmissionsByAssignment.fulfilled,
      (state, action) => {
        state.assignmentSubmissions = action.payload;
      }
    );

    // ➕ Submit assignment (student)
    builder.addCase(submitAssignmentThunk.fulfilled, (state, action) => {
      state.submissions.push(action.payload);
      state.assignmentSubmissions.push(action.payload);
    });

    // ✏️ Update submission
    builder.addCase(updateSubmissionThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.submissions = state.submissions.map((s) =>
        s._id === updated._id ? updated : s
      );

      state.assignmentSubmissions = state.assignmentSubmissions.map((s) =>
        s._id === updated._id ? updated : s
      );

      if (state.selectedSubmission?._id === updated._id) {
        state.selectedSubmission = updated;
      }
    });

    // ⭐ Grade submission
    builder.addCase(gradeSubmissionThunk.fulfilled, (state, action) => {
      const graded = action.payload;

      state.submissions = state.submissions.map((s) =>
        s._id === graded._id ? graded : s
      );
    });

    // 👀 Mark under review
    builder.addCase(markUnderReviewThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.submissions = state.submissions.map((s) =>
        s._id === updated._id ? updated : s
      );
    });
  },
});

export const {
  clearSelectedSubmission,
  clearSubmissionError,
} = submissionSlice.actions;

export default submissionSlice.reducer;