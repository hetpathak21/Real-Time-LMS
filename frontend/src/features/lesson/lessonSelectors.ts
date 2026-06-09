import { RootState } from "../../app/store";

export const selectLessons = (state: RootState) =>
  state.lesson.courseLessons;

/**
 * Course-specific lessons
 */
export const selectCourseLessons = (state: RootState) =>
  state.lesson.courseLessons;

/**
 * Selected lesson
 */
export const selectSelectedLesson = (state: RootState) =>
  state.lesson.selectedLesson;

/**
 * Loading state
 */
export const selectLessonLoading = (state: RootState) =>
  state.lesson.loading;

/**
 * Error state
 */
export const selectLessonError = (state: RootState) =>
  state.lesson.error;

/**
 * Get lesson by ID (cached lookup)
 */
export const selectLessonById =
  (id: string) => (state: RootState) =>
    state.lesson.courseLessons.find((lesson) => lesson._id === id) || null;
