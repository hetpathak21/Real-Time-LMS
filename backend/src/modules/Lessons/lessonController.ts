import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/AuthMiddleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { STATUS_CODES } from "../../constants/StatusCodes";
import {
  createLessonService,
  deleteLessonService,
  getCourseLessonsService,
  getLessonByIdService,
  updateLessonService,
} from "./lessonService";

const getUploadedFileUrl = (file?: Express.Multer.File) => {
  if (!file) return undefined;

  // Cloudinary multer-storage-cloudinary gives uploaded file URL in file.path.
  return file.path;
};

export const createLesson = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { courseId } = req.params as { courseId: string };

    const lessonPayload = {
      ...req.body,
      contentUrl: getUploadedFileUrl(req.file) || req.body.contentUrl,
    };

    const lesson = await createLessonService(
      courseId,
      teacherId!,
      lessonPayload
    );

    return sendResponse(
      res,
      STATUS_CODES.CREATED,
      true,
      "Lesson created successfully",
      lesson
    );
  }
);

export const getCourseLessons = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params as { courseId: string };
    const lessons = await getCourseLessonsService(courseId);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Lessons fetched successfully",
      lessons
    );
  }
);

export const getLessonById = asyncHandler(
  async (req: Request, res: Response) => {
    const { lessonId } = req.params as { lessonId: string };
    const lesson = await getLessonByIdService(lessonId);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Lesson fetched successfully",
      lesson
    );
  }
);

export const updateLesson = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { lessonId } = req.params as { lessonId: string };

    const lessonPayload = {
      ...req.body,
      contentUrl: getUploadedFileUrl(req.file) || req.body.contentUrl,
    };

    const lesson = await updateLessonService(
      lessonId,
      teacherId!,
      lessonPayload
    );

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Lesson updated successfully",
      lesson
    );
  }
);

export const deleteLesson = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const teacherId = req.user?.userId;
    const { lessonId } = req.params as { lessonId: string };

    await deleteLessonService(lessonId, teacherId!);

    return sendResponse(
      res,
      STATUS_CODES.SUCCESS,
      true,
      "Lesson deleted successfully"
    );
  }
);