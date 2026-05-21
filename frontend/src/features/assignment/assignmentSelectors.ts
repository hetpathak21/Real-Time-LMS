import { RootState } from "../../app/rootReducer";

/**
 * All assignments
 */
export const selectAssignments = (state: RootState) =>
  state.assignment.assignments;

/**
 * Course-specific assignments
 */
export const selectCourseAssignments = (state: RootState) =>
  state.assignment.courseAssignments;

/**
 * Selected assignment
 */
export const selectSelectedAssignment = (state: RootState) =>
  state.assignment.selectedAssignment;

/**
 * Loading state
 */
export const selectAssignmentLoading = (state: RootState) =>
  state.assignment.loading;

/**
 * Error state
 */
export const selectAssignmentError = (state: RootState) =>
  state.assignment.error;

/**
 * Get assignment by ID (cached lookup)
 */
export const selectAssignmentById =
  (id: string) => (state: RootState) =>
    state.assignment.assignments.find((a) => a._id === id) || null;