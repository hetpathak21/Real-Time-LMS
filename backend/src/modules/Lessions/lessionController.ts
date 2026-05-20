import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import {
  createLessonService,
  deleteLessonService,
  getCourseLessonsService,
  getLessonByIdService,
  updateLessonService,
} from "./lessionService";

interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const createLesson = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;

    const lesson = await createLessonService(
      req.params.courseId,
      teacherId!,
      req.body
    );

    return sendResponse(
      res,
      201,
      true,
      "Lesson created successfully",
      lesson
    );
  }
);

export const getCourseLessons = asyncHandler(
  async (req: Request, res: Response) => {
    const lessons = await getCourseLessonsService(
      req.params.courseId
    );

    return sendResponse(
      res,
      200,
      true,
      "Lessons fetched successfully",
      lessons
    );
  }
);

export const getLessonById = asyncHandler(
  async (req: Request, res: Response) => {
    const lesson = await getLessonByIdService(
      req.params.lessonId
    );

    return sendResponse(
      res,
      200,
      true,
      "Lesson fetched successfully",
      lesson
    );
  }
);

export const updateLesson = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;

    const lesson = await updateLessonService(
      req.params.lessonId,
      teacherId!,
      req.body
    );

    return sendResponse(
      res,
      200,
      true,
      "Lesson updated successfully",
      lesson
    );
  }
);

export const deleteLesson = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;

    await deleteLessonService(
      req.params.lessonId,
      teacherId!
    );

    return sendResponse(
      res,
      200,
      true,
      "Lesson deleted successfully"
    );
  }
);