import { createSlice } from "@reduxjs/toolkit";
import { IEnrollment } from "../../types/enrollmentTypes";

import {
  fetchEnrollments,
  fetchMyEnrollments,
  fetchEnrollmentById,
  enrollInCourseThunk,
  updateEnrollmentThunk,
  updateProgressThunk,
  dropCourseThunk,
  completeCourseThunk,
} from "./enrollmentThunks";

interface EnrollmentState {
  enrollments: IEnrollment[];
  myEnrollments: IEnrollment[];
  selectedEnrollment: IEnrollment | null;

  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = {
  enrollments: [],
  myEnrollments: [],
  selectedEnrollment: null,

  loading: false,
  error: null,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    clearSelectedEnrollment: (state) => {
      state.selectedEnrollment = null;
    },

    clearEnrollmentError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // 📚 All enrollments (admin/teacher)
    builder.addCase(fetchEnrollments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEnrollments.fulfilled, (state, action) => {
      state.loading = false;
      state.enrollments = action.payload;
    });
    builder.addCase(fetchEnrollments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // 👤 My enrollments (student)
    builder.addCase(fetchMyEnrollments.fulfilled, (state, action) => {
      state.myEnrollments = action.payload;
    });

    // 📄 Single enrollment
    builder.addCase(fetchEnrollmentById.fulfilled, (state, action) => {
      state.selectedEnrollment = action.payload;
    });

    // ➕ Enroll in course
    builder.addCase(enrollInCourseThunk.fulfilled, (state, action) => {
      state.myEnrollments.push(action.payload);
    });

    // ✏️ Update enrollment
    builder.addCase(updateEnrollmentThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.enrollments = state.enrollments.map((e) =>
        e._id === updated._id ? updated : e
      );

      state.myEnrollments = state.myEnrollments.map((e) =>
        e._id === updated._id ? updated : e
      );

      if (state.selectedEnrollment?._id === updated._id) {
        state.selectedEnrollment = updated;
      }
    });

    // 📊 Progress update
    builder.addCase(updateProgressThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.myEnrollments = state.myEnrollments.map((e) =>
        e._id === updated._id ? updated : e
      );
    });

    // ❌ Drop course
    builder.addCase(dropCourseThunk.fulfilled, (state, action) => {
      const id = action.payload;

      state.myEnrollments = state.myEnrollments.filter(
        (e) => e._id !== id
      );

      if (state.selectedEnrollment?._id === id) {
        state.selectedEnrollment = null;
      }
    });

    // ✅ Complete course
    builder.addCase(completeCourseThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.myEnrollments = state.myEnrollments.map((e) =>
        e._id === updated._id ? updated : e
      );
    });
  },
});

export const {
  clearSelectedEnrollment,
  clearEnrollmentError,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;