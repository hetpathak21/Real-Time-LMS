import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";

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

interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const createCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;

    const course = await createCourseService(req.body, teacherId!);

    return sendResponse(res,201,true,"course created successfully",course)
  }
);

export const getMyCourses = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;

    const result = await getMyCoursesService(teacherId!, req.query);

    return sendResponse(res,200,true,"Course fetched successfully",result.courses)
  }
);

export const getPublishedCourses = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getPublishedCoursesService(req.query);

    return sendResponse(res,200,true,"Published courses fetched successfully",result.courses)
  }
);

export const getCourseById = asyncHandler(
  async (req: Request, res: Response) => {
    const course = await getCourseByIdService(req.params.courseId);

    return sendResponse(res,200,true,"course fetched successfully",course)
  }
);

export const updateCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;

    const course = await updateCourseService(
      req.params.courseId,
      teacherId!,
      req.body
    );

    return sendResponse(res,200,true,"course updated successfully",course)
  }
);

export const deleteCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;

    await deleteCourseService(req.params.courseId, teacherId!);

    return sendResponse(res,200,true,"course deleted successfully")
  }
);

export const publishCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;

    const course = await publishCourseService(
      req.params.courseId,
      teacherId!
    );

    return sendResponse(res,200,true,"course published successfully",course)

  }
);

export const unpublishCourse = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;

    const course = await unpublishCourseService(
      req.params.courseId,
      teacherId!
    );

    return sendResponse(res,200,true,"course unpublished successfully",course)

  }
);