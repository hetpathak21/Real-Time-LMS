import { createSlice } from "@reduxjs/toolkit";
import { IAssignment } from "../../types/assignmentTypes";

import {
  fetchAssignments,
  fetchAssignmentById,
  fetchAssignmentsByCourse,
  createAssignmentThunk,
  updateAssignmentThunk,
  deleteAssignmentThunk,
  publishAssignmentThunk,
  closeAssignmentThunk,
} from "./assignmentThunks";

interface AssignmentState {
  assignments: IAssignment[];
  courseAssignments: IAssignment[];
  selectedAssignment: IAssignment | null;

  loading: boolean;
  error: string | null;
}

const initialState: AssignmentState = {
  assignments: [],
  courseAssignments: [],
  selectedAssignment: null,

  loading: false,
  error: null,
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    clearSelectedAssignment: (state) => {
      state.selectedAssignment = null;
    },

    clearAssignmentError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // 📚 All assignments
    builder.addCase(fetchAssignments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAssignments.fulfilled, (state, action) => {
      state.loading = false;
      state.assignments = action.payload;
    });
    builder.addCase(fetchAssignments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // 📄 Single assignment
    builder.addCase(fetchAssignmentById.fulfilled, (state, action) => {
      state.selectedAssignment = action.payload;
    });

    // 📘 Course-specific assignments
    builder.addCase(fetchAssignmentsByCourse.fulfilled, (state, action) => {
      state.courseAssignments = action.payload;
    });

    // ➕ Create
    builder.addCase(createAssignmentThunk.fulfilled, (state, action) => {
      state.assignments.push(action.payload);
      state.courseAssignments.push(action.payload);
    });

    // ✏️ Update
    builder.addCase(updateAssignmentThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.assignments = state.assignments.map((a) =>
        a._id === updated._id ? updated : a
      );

      state.courseAssignments = state.courseAssignments.map((a) =>
        a._id === updated._id ? updated : a
      );

      if (state.selectedAssignment?._id === updated._id) {
        state.selectedAssignment = updated;
      }
    });

    // 🗑 Delete
    builder.addCase(deleteAssignmentThunk.fulfilled, (state, action) => {
      const id = action.payload;

      state.assignments = state.assignments.filter((a) => a._id !== id);
      state.courseAssignments = state.courseAssignments.filter(
        (a) => a._id !== id
      );

      if (state.selectedAssignment?._id === id) {
        state.selectedAssignment = null;
      }
    });

    // 📢 Publish
    builder.addCase(publishAssignmentThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.assignments = state.assignments.map((a) =>
        a._id === updated._id ? updated : a
      );
    });

    // ❌ Close
    builder.addCase(closeAssignmentThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.assignments = state.assignments.map((a) =>
        a._id === updated._id ? updated : a
      );
    });
  },
});

export const {
  clearSelectedAssignment,
  clearAssignmentError,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;