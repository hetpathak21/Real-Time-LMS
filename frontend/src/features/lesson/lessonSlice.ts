import { createSlice } from "@reduxjs/toolkit";
import { ILesson } from "../../types/lessonTypes";

import {
  fetchLessonsByCourse,
  fetchLessonById,
  createLessonThunk,
  updateLessonThunk,
  deleteLessonThunk,
  markLessonCompleteThunk,
} from "./lessonThunks";

interface LessonState {
  lessons: ILesson[];
  courseLessons: ILesson[];
  selectedLesson: ILesson | null;

  loading: boolean;
  error: string | null;
}

const initialState: LessonState = {
  lessons: [],
  courseLessons: [],
  selectedLesson: null,

  loading: false,
  error: null,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    clearSelectedLesson: (state) => {
      state.selectedLesson = null;
    },

    clearLessonError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* -------------------------------------------------------------------------- */
    /*                           FETCH LESSONS BY COURSE                          */
    /* -------------------------------------------------------------------------- */

    builder.addCase(fetchLessonsByCourse.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchLessonsByCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.courseLessons = action.payload;
    });

    builder.addCase(fetchLessonsByCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /* -------------------------------------------------------------------------- */
    /*                             FETCH SINGLE LESSON                            */
    /* -------------------------------------------------------------------------- */

    builder.addCase(fetchLessonById.fulfilled, (state, action) => {
      state.selectedLesson = action.payload;
    });

    /* -------------------------------------------------------------------------- */
    /*                               CREATE LESSON                                */
    /* -------------------------------------------------------------------------- */

    builder.addCase(createLessonThunk.fulfilled, (state, action) => {
      const newLesson = action.payload;

      state.courseLessons.push(newLesson);
      state.lessons.push(newLesson);
    });

    /* -------------------------------------------------------------------------- */
    /*                               UPDATE LESSON                                */
    /* -------------------------------------------------------------------------- */

    builder.addCase(updateLessonThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.courseLessons = state.courseLessons.map((l) =>
        l._id === updated._id ? updated : l
      );

      state.lessons = state.lessons.map((l) =>
        l._id === updated._id ? updated : l
      );

      if (state.selectedLesson?._id === updated._id) {
        state.selectedLesson = updated;
      }
    });

    /* -------------------------------------------------------------------------- */
    /*                               DELETE LESSON                                */
    /* -------------------------------------------------------------------------- */

    builder.addCase(deleteLessonThunk.fulfilled, (state, action) => {
      const lessonId = action.payload;

      state.courseLessons = state.courseLessons.filter(
        (l) => l._id !== lessonId
      );

      state.lessons = state.lessons.filter((l) => l._id !== lessonId);

      if (state.selectedLesson?._id === lessonId) {
        state.selectedLesson = null;
      }
    });

    /* -------------------------------------------------------------------------- */
    /*                          MARK LESSON COMPLETED                             */
    /* -------------------------------------------------------------------------- */

    builder.addCase(markLessonCompleteThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.courseLessons = state.courseLessons.map((l) =>
        l._id === updated._id ? updated : l
      );

      state.lessons = state.lessons.map((l) =>
        l._id === updated._id ? updated : l
      );

      if (state.selectedLesson?._id === updated._id) {
        state.selectedLesson = updated;
      }
    });
  },
});

export const { clearSelectedLesson, clearLessonError } =
  lessonSlice.actions;

export default lessonSlice.reducer;