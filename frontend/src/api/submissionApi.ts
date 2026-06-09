import axiosInstance from "./axiosInstance";
import {
  ISubmission,
  ICreateSubmissionPayload,
  IUpdateSubmissionPayload,
  ISubmissionQuery,
  ISubmissionDetails,
} from "../types/submissionTypes";

export const submitAssignment = async (
  data: ICreateSubmissionPayload
): Promise<ISubmission> => {
  const res = await axiosInstance.post(
    `/assignment/${data.assignmentId}/submissions`,
    {
      textAnswer: data.textAnswer,
      fileUrl: data.fileUrl,
    }
  );
  return res.data.data;
};

export const getSubmissions = async (
  query?: ISubmissionQuery
): Promise<ISubmission[]> => {
  if (!query?.assignmentId) {
    return [];
  }

  const res = await axiosInstance.get(
    `/assignment/${query.assignmentId}/submissions`
  );
  return res.data.data;
};

export const getSubmissionById = async (
  submissionId: string
): Promise<ISubmissionDetails> => {
  void submissionId;
  throw new Error("Single submission details endpoint is not available yet");
};

export const getSubmissionsByAssignment = async (
  assignmentId: string
): Promise<ISubmission[]> => {
  const res = await axiosInstance.get(
    `/assignment/${assignmentId}/submissions`
  );
  return res.data.data;
};

export const updateSubmission = async (
  submissionId: string,
  data: IUpdateSubmissionPayload
): Promise<ISubmission> => {
  const res = await axiosInstance.patch(
    `/assignment/submissions/${submissionId}/grade`,
    {
      grade: data.grade,
      feedback: data.feedback,
    }
  );
  return res.data.data;
};

export const gradeSubmission = async (
  submissionId: string,
  grade: number,
  feedback: string
): Promise<ISubmission> => {
  const res = await axiosInstance.patch(
    `/assignment/submissions/${submissionId}/grade`,
    { grade, feedback }
  );
  return res.data.data;
};

export const markUnderReview = async (
  submissionId: string
): Promise<ISubmission> => {
  void submissionId;
  throw new Error("Review-only submission endpoint is not available yet");
};
