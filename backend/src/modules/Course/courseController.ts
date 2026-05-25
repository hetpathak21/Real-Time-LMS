import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/AuthMiddleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { STATUS_CODES } from "../../constants/StatusCodes";

import {
  createCourseService,
  deleteCourseService,
  getCourseByIdService,
  getMyCoursesService,
  getPublishedCoursesService,
  publishCourseService,
  unpublishCourseService,
  updateCourseService,
} from "./courseService";

export const createCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const course = await createCourseService(req.body, teacherId!);

    return sendResponse(
      res,
      STATUS_CODES.CREATED,
      true,
      "Course created successfully",
      course
    );
  }
);

export const getMyCourses = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const result = await getMyCoursesService(teacherId!, req.query);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Courses fetched successfully!",
      result
    );
  }
);

export const getPublishedCourses = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getPublishedCoursesService(req.query);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Published courses fetched successfully!",
      result
    );
  }
);

export const getCourseById = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params as { courseId: string };
    const course = await getCourseByIdService(courseId);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Course fetched successfully!",
      course
    );
  }
);

export const updateCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params as { courseId: string };

    const course = await updateCourseService(courseId, teacherId!, req.body);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Course updated successfully!",
      course
    );
  }
);

export const deleteCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params as { courseId: string };

    await deleteCourseService(courseId, teacherId!);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Course deleted successfully!"
    );
  }
);

export const publishCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params as { courseId: string };

    const course = await publishCourseService(courseId, teacherId!);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Course published successfully!",
      course
    );
  }
);

export const unpublishCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params as { courseId: string };

    const course = await unpublishCourseService(courseId, teacherId!);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Course unpublished successfully!",
      course
    );
  }
);
