import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../types/courseTypes";

import {
  fetchAllCourses,
  fetchCourseById,
  fetchMyCourses,
  createCourseThunk,
  updateCourseThunk,
  deleteCourseThunk,
  togglePublishCourseThunk,
} from "./courseThunks";

interface CourseState {
  courses: ICourse[];
  myCourses: ICourse[];
  selectedCourse: ICourse | null;

  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  myCourses: [],
  selectedCourse: null,

  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },

    clearCourseError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // 📚 Get all courses
    builder.addCase(fetchAllCourses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    });
    builder.addCase(fetchAllCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // 📄 Get course by ID
    builder.addCase(fetchCourseById.fulfilled, (state, action) => {
      state.selectedCourse = action.payload;
    });

    // 👨‍🏫 My courses (Teacher)
    builder.addCase(fetchMyCourses.fulfilled, (state, action) => {
      state.myCourses = action.payload;
    });

    // ➕ Create course
    builder.addCase(createCourseThunk.fulfilled, (state, action) => {
      state.courses.push(action.payload);
      state.myCourses.push(action.payload);
    });

    // ✏️ Update course
    builder.addCase(updateCourseThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.courses = state.courses.map((course) =>
        course._id === updated._id ? updated : course
      );

      state.myCourses = state.myCourses.map((course) =>
        course._id === updated._id ? updated : course
      );

      if (state.selectedCourse?._id === updated._id) {
        state.selectedCourse = updated;
      }
    });

    // 🗑 Delete course
    builder.addCase(deleteCourseThunk.fulfilled, (state, action) => {
      const deletedId = action.payload;

      state.courses = state.courses.filter((c) => c._id !== deletedId);
      state.myCourses = state.myCourses.filter((c) => c._id !== deletedId);

      if (state.selectedCourse?._id === deletedId) {
        state.selectedCourse = null;
      }
    });

    // 📢 Toggle publish/unpublish
    builder.addCase(togglePublishCourseThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.courses = state.courses.map((course) =>
        course._id === updated._id ? updated : course
      );

      state.myCourses = state.myCourses.map((course) =>
        course._id === updated._id ? updated : course
      );

      if (state.selectedCourse?._id === updated._id) {
        state.selectedCourse = updated;
      }
    });
  },
});

export const { clearSelectedCourse, clearCourseError } = courseSlice.actions;

export default courseSlice.reducer;