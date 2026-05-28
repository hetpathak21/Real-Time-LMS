import axiosInstance from "./axiosInstance";
import {
  IAssignment,
  ICreateAssignmentPayload,
  IUpdateAssignmentPayload,
  IAssignmentDetails,
} from "../types/assignmentTypes";

export const createAssignment = async (
  courseId: string,
  data: ICreateAssignmentPayload
): Promise<IAssignment> => {
  const res = await axiosInstance.post(`/assignment/course/${courseId}`, data);
  return res.data.data;
};

export const getAssignmentById = async (
  assignmentId: string
): Promise<IAssignmentDetails> => {
  const res = await axiosInstance.get(`/assignment/${assignmentId}`);
  return res.data.data;
};

export const updateAssignment = async (
  assignmentId: string,
  data: IUpdateAssignmentPayload
): Promise<IAssignment> => {
  const res = await axiosInstance.patch(`/assignment/${assignmentId}`, data);
  return res.data.data;
};

export const deleteAssignment = async (
  assignmentId: string
): Promise<void> => {
  await axiosInstance.delete(`/assignment/${assignmentId}`);
};

export const getAssignmentsByCourse = async (
  courseId: string
): Promise<IAssignment[]> => {
  const res = await axiosInstance.get(`/assignment/course/${courseId}`);
  return res.data.data;
};

export const setAssignmentPublishStatus = async (
  assignmentId: string,
  isPublished: boolean
): Promise<IAssignment> => {
  const res = await axiosInstance.patch(
    `/assignment/${assignmentId}/publish`,
    { isPublished }
  );
  return res.data.data;
};
