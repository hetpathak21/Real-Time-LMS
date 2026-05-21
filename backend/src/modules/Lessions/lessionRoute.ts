import { Router } from "express";
import { authMiddleware } from "../../middleware/AuthMiddleware";
import { authorizeRoles } from "../../middleware/RoleMiddleware";
import { validateRequest } from "../../middleware/ValiateMiddleware";
import {
  courseLessonIdValidationSchema,
  createLessonValidationSchema,
  lessonIdValidationSchema,
  updateLessonValidationSchema,
} from "./LessonValidation";
import {
  createLesson,
  deleteLesson,
  getCourseLessons,
  getLessonById,
  updateLesson,
} from "./lessionController";

const router = Router();

router.get(
  "/:courseId/lessons",
  validateRequest(courseLessonIdValidationSchema),
  getCourseLessons
);

router.post(
  "/:courseId/lessons",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(createLessonValidationSchema),
  createLesson
);

router.get(
  "/lessons/:lessonId",
  validateRequest(lessonIdValidationSchema),
  getLessonById
);

router.put(
  "/lessons/:lessonId",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(updateLessonValidationSchema),
  updateLesson
);

router.delete(
  "/lessons/:lessonId",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(lessonIdValidationSchema),
  deleteLesson
);

export const LessonRoutes = router;
