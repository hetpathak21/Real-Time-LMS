import axiosInstance from "./axiosInstance";
import {
  ISubmission,
  ICreateSubmissionPayload,
  IUpdateSubmissionPayload,
  ISubmissionQuery,
  ISubmissionDetails,
} from "../types/submissionTypes";

/**
 * Student submits assignment
 */
export const submitAssignment = async (
  data: ICreateSubmissionPayload
): Promise<ISubmission> => {
  const res = await axiosInstance.post("/submissions", data);
  return res.data;
};

/**
 * Get all submissions (Teacher/Admin)
 */
export const getSubmissions = async (
  query?: ISubmissionQuery
): Promise<ISubmission[]> => {
  const res = await axiosInstance.get("/submissions", {
    params: query,
  });
  return res.data;
};

/**
 * Get single submission details
 */
export const getSubmissionById = async (
  submissionId: string
): Promise<ISubmissionDetails> => {
  const res = await axiosInstance.get(`/submissions/${submissionId}`);
  return res.data;
};

/**
 * Get submissions for a specific assignment
 */
export const getSubmissionsByAssignment = async (
  assignmentId: string
): Promise<ISubmission[]> => {
  const res = await axiosInstance.get(
    `/assignments/${assignmentId}/submissions`
  );
  return res.data;
};

/**
 * Update submission (Teacher grading / feedback)
 */
export const updateSubmission = async (
  submissionId: string,
  data: IUpdateSubmissionPayload
): Promise<ISubmission> => {
  const res = await axiosInstance.put(
    `/submissions/${submissionId}`,
    data
  );
  return res.data;
};

/**
 * Grade submission (explicit grading endpoint)
 */
export const gradeSubmission = async (
  submissionId: string,
  marksObtained: number,
  feedback: string
): Promise<ISubmission> => {
  const res = await axiosInstance.patch(
    `/submissions/${submissionId}/grade`,
    {
      marksObtained,
      feedback,
    }
  );
  return res.data;
};

/**
 * Mark submission as reviewed
 */
export const markUnderReview = async (
  submissionId: string
): Promise<ISubmission> => {
  const res = await axiosInstance.patch(
    `/submissions/${submissionId}/review`
  );
  return res.data;
};