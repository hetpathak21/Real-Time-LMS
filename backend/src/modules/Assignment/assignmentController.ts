import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/AuthMiddleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { AppError } from "../../utils/appError";
import { STATUS_CODES } from "../../constants/StatusCodes";
import {
  createAssignmentService,
  deleteAssignmentService,
  getAssignmentByIdService,
  getCourseAssignmentsService,
  updateAssignmentService,
} from "./assignmentService";

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
  async (req: Request, res: Response) => {
    const { courseId } = req.params as { courseId: string };

    const assignments = await getCourseAssignmentsService(courseId);

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
  async (req: Request, res: Response) => {
    const { assignmentId } = req.params as { assignmentId: string };

    const assignment = await getAssignmentByIdService(assignmentId);

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