import { RootState } from "../../app/rootReducer";

/**
 * All enrollments (admin/teacher)
 */
export const selectEnrollments = (state: RootState) =>
  state.enrollment.enrollments;

/**
 * My enrollments (student)
 */
export const selectMyEnrollments = (state: RootState) =>
  state.enrollment.myEnrollments;

/**
 * Selected enrollment
 */
export const selectSelectedEnrollment = (state: RootState) =>
  state.enrollment.selectedEnrollment;

/**
 * Loading state
 */
export const selectEnrollmentLoading = (state: RootState) =>
  state.enrollment.loading;

/**
 * Error state
 */
export const selectEnrollmentError = (state: RootState) =>
  state.enrollment.error;

/**
 * Get enrollment by course ID (very useful in UI)
 */
export const selectEnrollmentByCourseId =
  (courseId: string) => (state: RootState) =>
    state.enrollment.myEnrollments.find(
      (e) =>
        typeof e.course === "string"
          ? e.course === courseId
          : e.course._id === courseId
    ) || null;