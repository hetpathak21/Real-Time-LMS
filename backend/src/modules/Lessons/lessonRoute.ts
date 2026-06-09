import { Router } from "express";
import { authMiddleware } from "../../middleware/AuthMiddleware";
import { authorizeRoles } from "../../middleware/RoleMiddleware";
import { validateRequest } from "../../middleware/ValiateMiddleware";
import { upload } from "../../middleware/uploadMiddleware";
import {
  courseLessonIdValidationSchema,
  createLessonValidationSchema,
  lessonIdValidationSchema,
  updateLessonValidationSchema,
} from "./LessonValidation";
import {
  createLesson,
  deleteLesson,
  downloadLessonContent,
  getCourseLessons,
  getLessonById,
  updateLesson,
} from "./lessonController";

const router = Router();

router.get(
  "/:courseId/lessons",
  validateRequest(courseLessonIdValidationSchema),
  getCourseLessons
);

router.post(
  "/:courseId/lessons",
  authMiddleware,
  authorizeRoles("teacher", "admin"),
  upload.single("content"),
  validateRequest(createLessonValidationSchema),
  createLesson
);

router.get(
  "/:lessonId/download",
  validateRequest(lessonIdValidationSchema),
  downloadLessonContent
);

router.get(
  "/:lessonId",
  validateRequest(lessonIdValidationSchema),
  getLessonById
);

router.put(
  "/:lessonId",
  authMiddleware,
  authorizeRoles("teacher", "admin"),
  upload.single("content"),
  validateRequest(updateLessonValidationSchema),
  updateLesson
);

router.delete(
  "/:lessonId",
  authMiddleware,
  authorizeRoles("teacher", "admin"),
  validateRequest(lessonIdValidationSchema),
  deleteLesson
);

export const LessonRoutes = router;
