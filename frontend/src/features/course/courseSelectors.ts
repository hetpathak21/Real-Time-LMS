import { RootState } from "../../app/rootReducer";

/**
 * Get all courses (student view)
 */
export const selectAllCourses = (state: RootState) =>
  state.course.courses;

/**
 * Get teacher's own courses
 */
export const selectMyCourses = (state: RootState) =>
  state.course.myCourses;

/**
 * Get selected course (Course details page)
 */
export const selectSelectedCourse = (state: RootState) =>
  state.course.selectedCourse;

/**
 * Get loading state
 */
export const selectCourseLoading = (state: RootState) =>
  state.course.loading;

/**
 * Get error state
 */
export const selectCourseError = (state: RootState) =>
  state.course.error;

/**
 * Get course by ID from cached list
 * (useful to avoid extra API calls)
 */
export const selectCourseById =
  (courseId: string) => (state: RootState) =>
    state.course.courses.find((c: { _id: string; }) => c._id === courseId) || null;

/**
 * Get published courses only
 */
export const selectPublishedCourses = (state: RootState) =>
  state.course.courses.filter((course: { isPublished: unknown; }) => course.isPublished);

/**
 * Get draft/unpublished courses (teacher/admin)
 */
export const selectDraftCourses = (state: RootState) =>
  state.course.myCourses.filter((course: { isPublished: unknown; }) => !course.isPublished);