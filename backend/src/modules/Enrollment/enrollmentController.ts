import { Response } from "express";
import { AuthRequest } from "../../middleware/AuthMiddleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { STATUS_CODES } from "../../constants/StatusCodes";
import { AppError } from "../../utils/appError";
import {
  enrollCourseService,
  getCourseStudentsService,
  getEnrollmentProgressService,
  getMyEnrolledCoursesService,
  updateLastAccessedService,
} from "./enrollmentService";

export const enrollCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const studentId = req.user?.userId;
    const { courseId } = req.params as { courseId: string };

    if (!studentId) {
      throw new AppError(
        "Unauthorized user",
        STATUS_CODES.UNAUTHORIZED
      );
    }

    const enrollment = await enrollCourseService(
      courseId,
      studentId
    );

    return sendResponse(
      res,
      STATUS_CODES.CREATED,
      true,
      "Course enrolled successfully",
      enrollment
    );
  }
);

export const getMyEnrolledCourses = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const studentId = req.user?.userId;

    if (!studentId) {
      throw new AppError(
        "Unauthorized user",
        STATUS_CODES.UNAUTHORIZED
      );
    }

    const result = await getMyEnrolledCoursesService(
      studentId,
      req.query
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Enrolled courses fetched successfully",
      result
    );
  }
);

export const getEnrollmentProgress = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const studentId = req.user?.userId;
    const { courseId } = req.params as { courseId: string };

    if (!studentId) {
      throw new AppError(
        "Unauthorized user",
        STATUS_CODES.UNAUTHORIZED
      );
    }

    const progress = await getEnrollmentProgressService(
      courseId,
      studentId
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Enrollment progress fetched successfully",
      progress
    );
  }
);

export const updateLastAccessed = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const studentId = req.user?.userId;
    const { courseId } = req.params as { courseId: string };

    if (!studentId) {
      throw new AppError(
        "Unauthorized user",
        STATUS_CODES.UNAUTHORIZED
      );
    }

    const enrollment = await updateLastAccessedService(
      courseId,
      studentId
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Last accessed time updated successfully",
      enrollment
    );
  }
);

export const getCourseStudents = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params as { courseId: string };

    if (!teacherId) {
      throw new AppError(
        "Unauthorized user",
        STATUS_CODES.UNAUTHORIZED
      );
    }

    const result = await getCourseStudentsService(
      courseId,
      teacherId,
      req.query
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Course students fetched successfully",
      result
    );
  }
);