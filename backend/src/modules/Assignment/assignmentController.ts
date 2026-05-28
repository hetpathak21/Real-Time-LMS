import { Response } from "express";
import { AuthRequest } from "../../middleware/AuthMiddleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { AppError } from "../../utils/appError";
import { STATUS_CODES } from "../../constants/StatusCodes";
import {
  createAssignmentService,
  deleteAssignmentService,
  getAssignmentSubmissionsService,
  getAssignmentByIdService,
  getCourseAssignmentsService,
  gradeSubmissionService,
  setAssignmentPublishStatusService,
  submitAssignmentService,
  updateAssignmentService,
} from "./assignmentService";
import { AssignmentViewer } from "./assignmentTypes";

const getViewer = (req: AuthRequest): AssignmentViewer => {
  const userId = req.user?.userId;
  const role = req.user?.role;

  if (!userId || !role) {
    throw new AppError("Unauthorized user", STATUS_CODES.UNAUTHORIZED);
  }

  if (role !== "student" && role !== "teacher" && role !== "admin") {
    throw new AppError("Access denied: insufficient permissions", STATUS_CODES.FORBIDDEN);
  }

  return { userId, role };
};

export const createAssignment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params as { courseId: string };

    if (!teacherId) {
      throw new AppError("Unauthorized user", STATUS_CODES.UNAUTHORIZED);
    }

    const assignment = await createAssignmentService(
      courseId,
      teacherId,
      req.body
    );

    return sendResponse(
      res,
      STATUS_CODES.CREATED,
      true,
      "Assignment created successfully",
      assignment
    );
  }
);

export const getCourseAssignments = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { courseId } = req.params as { courseId: string };
    const viewer = getViewer(req);

    const assignments = await getCourseAssignmentsService(courseId, viewer);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Assignments fetched successfully",
      assignments
    );
  }
);

export const getAssignmentById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { assignmentId } = req.params as { assignmentId: string };
    const viewer = getViewer(req);

    const assignment = await getAssignmentByIdService(assignmentId, viewer);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Assignment fetched successfully",
      assignment
    );
  }
);

export const updateAssignment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { assignmentId } = req.params as { assignmentId: string };

    if (!teacherId) {
      throw new AppError("Unauthorized user", STATUS_CODES.UNAUTHORIZED);
    }

    const assignment = await updateAssignmentService(
      assignmentId,
      teacherId,
      req.body
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Assignment updated successfully",
      assignment
    );
  }
);

export const publishAssignment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { assignmentId } = req.params as { assignmentId: string };
    const { isPublished } = req.body as { isPublished: boolean };

    if (!teacherId) {
      throw new AppError("Unauthorized user", STATUS_CODES.UNAUTHORIZED);
    }

    const assignment = await setAssignmentPublishStatusService(
      assignmentId,
      teacherId,
      isPublished
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      isPublished
        ? "Assignment published successfully"
        : "Assignment unpublished successfully",
      assignment
    );
  }
);

export const deleteAssignment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { assignmentId } = req.params as { assignmentId: string };

    if (!teacherId) {
      throw new AppError("Unauthorized user", STATUS_CODES.UNAUTHORIZED);
    }

    await deleteAssignmentService(assignmentId, teacherId);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Assignment deleted successfully"
    );
  }
);

export const submitAssignment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const studentId = req.user?.userId;
    const { assignmentId } = req.params as { assignmentId: string };

    if (!studentId) {
      throw new AppError("Unauthorized user", STATUS_CODES.UNAUTHORIZED);
    }

    const submission = await submitAssignmentService(
      assignmentId,
      studentId,
      req.body
    );

    return sendResponse(
      res,
      STATUS_CODES.CREATED,
      true,
      "Assignment submitted successfully",
      submission
    );
  }
);

export const getAssignmentSubmissions = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { assignmentId } = req.params as { assignmentId: string };

    if (!teacherId) {
      throw new AppError("Unauthorized user", STATUS_CODES.UNAUTHORIZED);
    }

    const submissions = await getAssignmentSubmissionsService(
      assignmentId,
      teacherId
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Submissions fetched successfully",
      submissions
    );
  }
);

export const gradeSubmission = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { submissionId } = req.params as { submissionId: string };

    if (!teacherId) {
      throw new AppError("Unauthorized user", STATUS_CODES.UNAUTHORIZED);
    }

    const submission = await gradeSubmissionService(
      submissionId,
      teacherId,
      req.body
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Submission graded successfully",
      submission
    );
  }
);
