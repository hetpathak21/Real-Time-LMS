import axiosInstance from "./axiosInstance";
import {
  IAssignment,
  ICreateAssignmentPayload,
  IUpdateAssignmentPayload,
  // IAssignmentQuery,
  IAssignmentDetails,
} from "../types/assignmentTypes";

/**
 * Create assignment (Teacher/Admin)
 */
export const createAssignment = async (
  data: ICreateAssignmentPayload
): Promise<IAssignment> => {
  const res = await axiosInstance.post("/assignment", data);
  return res.data;
};

// /**
//  * Get all assignments (with filters)
//  */
// export const getAssignments = async (
//   query?: IAssignmentQuery
// ): Promise<IAssignment[]> => {
//   const res = await axiosInstance.get("/assignment", {
//     params: query,
//   });
//   return res.data;
// };

/**
 * Get assignment by ID
 */
export const getAssignmentById = async (
  assignmentId: string
): Promise<IAssignmentDetails> => {
  const res = await axiosInstance.get(`/assignment/${assignmentId}`);
  return res.data;
};

/**
 * Update assignment (Teacher/Admin)
 */
export const updateAssignment = async (
  assignmentId: string,
  data: IUpdateAssignmentPayload
): Promise<IAssignment> => {
  const res = await axiosInstance.put(
    `/assignment/${assignmentId}`,
    data
  );
  return res.data;
};

/**
 * Delete assignment
 */
export const deleteAssignment = async (
  assignmentId: string
): Promise<void> => {
  await axiosInstance.delete(`/assignment/${assignmentId}`);
};

/**
 * Get assignments for a specific course
 */
export const getAssignmentsByCourse = async (
  courseId: string
): Promise<IAssignment[]> => {
  const res = await axiosInstance.get(
    `/assignment/courses/${courseId}`
  );
  return res.data;
};

/**
 * Publish assignment 
 */
export const publishAssignment = async (
  assignmentId: string
): Promise<IAssignment> => {
  const res = await axiosInstance.patch(
    `/assignment/${assignmentId}/publish`
  );
  return res.data;
};

/**
 * Close assignment 
 */
export const closeAssignment = async (
  assignmentId: string
): Promise<IAssignment> => {
  const res = await axiosInstance.patch(
    `/assignment/${assignmentId}/close`
  );
  return res.data;
};