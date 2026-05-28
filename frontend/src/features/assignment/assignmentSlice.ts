import { createSlice } from "@reduxjs/toolkit";
import { IAssignment } from "../../types/assignmentTypes";

import {
  fetchAssignmentById,
  fetchAssignmentsByCourse,
  createAssignmentThunk,
  updateAssignmentThunk,
  deleteAssignmentThunk,
  publishAssignmentThunk,
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

const updateAssignmentInState = (
  state: AssignmentState,
  assignment: IAssignment
) => {
  state.assignments = state.assignments.map((item) =>
    item._id === assignment._id ? assignment : item
  );
  state.courseAssignments = state.courseAssignments.map((item) =>
    item._id === assignment._id ? assignment : item
  );

  if (state.selectedAssignment?._id === assignment._id) {
    state.selectedAssignment = assignment;
  }
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
    builder
      .addCase(fetchAssignmentsByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentsByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courseAssignments = action.payload;
      })
      .addCase(fetchAssignmentsByCourse.rejected, (state, action) => {
        state.loading = false;
        state.courseAssignments = [];
        state.error = (action.payload as string) || "Failed to fetch assignments";
      })
      .addCase(fetchAssignmentById.fulfilled, (state, action) => {
        state.selectedAssignment = action.payload;
      })
      .addCase(createAssignmentThunk.fulfilled, (state, action) => {
        state.courseAssignments.unshift(action.payload);
      })
      .addCase(updateAssignmentThunk.fulfilled, (state, action) => {
        updateAssignmentInState(state, action.payload);
      })
      .addCase(publishAssignmentThunk.fulfilled, (state, action) => {
        updateAssignmentInState(state, action.payload);
      })
      .addCase(deleteAssignmentThunk.fulfilled, (state, action) => {
        state.courseAssignments = state.courseAssignments.filter(
          (item) => item._id !== action.payload
        );
        state.assignments = state.assignments.filter(
          (item) => item._id !== action.payload
        );

        if (state.selectedAssignment?._id === action.payload) {
          state.selectedAssignment = null;
        }
      });
  },
});

export const { clearSelectedAssignment, clearAssignmentError } =
  assignmentSlice.actions;

export default assignmentSlice.reducer;
