import { createSlice } from "@reduxjs/toolkit";
import { ICourse, ICourseListMeta } from "../../types/courseTypes";

import {
  fetchAllCourses,
  fetchCourseById,
  fetchMyCourses,
  createCourseThunk,
  updateCourseThunk,
  deleteCourseThunk,
  publishCourseThunk,
  unpublishCourseThunk,
} from "./courseThunks";

interface CourseState {
  courses: ICourse[];
  myCourses: ICourse[];
  selectedCourse: ICourse | null;
  coursesMeta: ICourseListMeta | null;
  myCoursesMeta: ICourseListMeta | null;
  courseCreationAnimation: {
    courseId: string;
    title: string;
  } | null;
  recentlyCreatedCourseId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  myCourses: [],
  selectedCourse: null,
  coursesMeta: null,
  myCoursesMeta: null,
  courseCreationAnimation: null,
  recentlyCreatedCourseId: null,
  loading: false,
  error: null,
};

/**
 * Helper: update course in all lists
 */
const updateCourseInLists = (state: CourseState, updated: ICourse) => {
  state.courses = state.courses.map((c) =>
    c._id === updated._id ? updated : c
  );

  state.myCourses = state.myCourses.map((c) =>
    c._id === updated._id ? updated : c
  );

  if (state.selectedCourse?._id === updated._id) {
    state.selectedCourse = updated;
  }
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
    dismissCourseCreatedAnimation: (state) => {
      state.courseCreationAnimation = null;
    },
    clearRecentlyCreatedCourse: (state) => {
      state.recentlyCreatedCourseId = null;
    },
  },

  extraReducers: (builder) => {
    /* ---------------- FETCH ALL COURSES ---------------- */
    builder.addCase(fetchAllCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload.courses;
      state.coursesMeta = action.payload.meta;
    });

    builder.addCase(fetchAllCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch courses";
    });

    /* ---------------- FETCH COURSE BY ID ---------------- */
    builder.addCase(fetchCourseById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchCourseById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedCourse = action.payload;
    });

    builder.addCase(fetchCourseById.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch course";
    });

    /* ---------------- MY COURSES ---------------- */
    builder.addCase(fetchMyCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchMyCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.myCourses = action.payload.courses;
      state.myCoursesMeta = action.payload.meta;
    });

    builder.addCase(fetchMyCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch my courses";
    });

    /* ---------------- CREATE COURSE ---------------- */
    builder.addCase(createCourseThunk.fulfilled, (state, action) => {
      // safer: avoid duplicates
      state.myCourses.unshift(action.payload);
      state.courseCreationAnimation = {
        courseId: action.payload._id,
        title: action.payload.title,
      };
      state.recentlyCreatedCourseId = action.payload._id;
    });

    builder.addCase(createCourseThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    /* ---------------- UPDATE COURSE ---------------- */
    builder.addCase(updateCourseThunk.fulfilled, (state, action) => {
      updateCourseInLists(state, action.payload);
    });

    builder.addCase(updateCourseThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    /* ---------------- DELETE COURSE ---------------- */
    builder.addCase(deleteCourseThunk.fulfilled, (state, action) => {
      const id = action.payload;

      state.courses = state.courses.filter((c) => c._id !== id);
      state.myCourses = state.myCourses.filter((c) => c._id !== id);

      if (state.selectedCourse?._id === id) {
        state.selectedCourse = null;
      }
    });

    builder.addCase(deleteCourseThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    /* ---------------- PUBLISH COURSE ---------------- */
    builder.addCase(publishCourseThunk.fulfilled, (state, action) => {
      updateCourseInLists(state, action.payload);
    });

    builder.addCase(publishCourseThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    /* ---------------- UNPUBLISH COURSE ---------------- */
    builder.addCase(unpublishCourseThunk.fulfilled, (state, action) => {
      updateCourseInLists(state, action.payload);
    });

    builder.addCase(unpublishCourseThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const {
  clearSelectedCourse,
  clearCourseError,
  dismissCourseCreatedAnimation,
  clearRecentlyCreatedCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
