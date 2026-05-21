import { RootState } from "../../app/rootReducer";

/**
 * All submissions
 */
export const selectSubmissions = (state: RootState) =>
  state.submission.submissions;

/**
 * Assignment-specific submissions
 */
export const selectAssignmentSubmissions = (state: RootState) =>
  state.submission.assignmentSubmissions;

/**
 * Selected submission
 */
export const selectSelectedSubmission = (state: RootState) =>
  state.submission.selectedSubmission;

/**
 * Loading state
 */
export const selectSubmissionLoading = (state: RootState) =>
  state.submission.loading;

/**
 * Error state
 */
export const selectSubmissionError = (state: RootState) =>
  state.submission.error;

/**
 * Get submission by ID (cached lookup)
 */
export const selectSubmissionById =
  (id: string) => (state: RootState) =>
    state.submission.submissions.find((s) => s._id === id) || null;