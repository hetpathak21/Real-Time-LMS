import { createSlice } from "@reduxjs/toolkit";
import { ILesson } from "../../types/lessonTypes";
import {
  createLessonThunk,
  deleteLessonThunk,
  fetchLessonById,
  fetchLessonsByCourse,
  updateLessonThunk,
} from "./lessonThunks";

interface LessonState {
  courseLessons: ILesson[];
  selectedLesson: ILesson | null;
  loading: boolean;
  error: string | null;
}

const initialState: LessonState = {
  courseLessons: [],
  selectedLesson: null,
  loading: false,
  error: null,
};

const updateLessonInState = (state: LessonState, lesson: ILesson) => {
  state.courseLessons = state.courseLessons.map((item) =>
    item._id === lesson._id ? lesson : item
  );

  if (state.selectedLesson?._id === lesson._id) {
    state.selectedLesson = lesson;
  }
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
    builder.addCase(fetchLessonsByCourse.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLessonsByCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.courseLessons = action.payload;
    });
    builder.addCase(fetchLessonsByCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch lessons";
    });

    builder.addCase(fetchLessonById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLessonById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedLesson = action.payload;
    });
    builder.addCase(fetchLessonById.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch lesson";
    });

    builder.addCase(createLessonThunk.fulfilled, (state, action) => {
      state.courseLessons.push(action.payload);
      state.courseLessons.sort((a, b) => a.order - b.order);
    });
    builder.addCase(createLessonThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    builder.addCase(updateLessonThunk.fulfilled, (state, action) => {
      updateLessonInState(state, action.payload);
      state.courseLessons.sort((a, b) => a.order - b.order);
    });
    builder.addCase(updateLessonThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    builder.addCase(deleteLessonThunk.fulfilled, (state, action) => {
      state.courseLessons = state.courseLessons.filter(
        (lesson) => lesson._id !== action.payload
      );

      if (state.selectedLesson?._id === action.payload) {
        state.selectedLesson = null;
      }
    });
    builder.addCase(deleteLessonThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { clearSelectedLesson, clearLessonError } = lessonSlice.actions;

export default lessonSlice.reducer;
