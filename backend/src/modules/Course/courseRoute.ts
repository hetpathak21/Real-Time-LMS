import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getMyCourses,
  getPublishedCourses,
  publishCourse,
  unpublishCourse,
  updateCourse,
} from "./courseController";
import {
  courseIdValidationSchema,
  courseListValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from "./CourseValidation";
import { validateRequest } from "../../middleware/ValiateMiddleware";
import { authMiddleware } from "../../middleware/AuthMiddleware";
import { authorizeRoles } from "../../middleware/RoleMiddleware";

const router = Router();

router.get(
  "/",
  validateRequest(courseListValidationSchema),
  getPublishedCourses
);

router.get(
  "/my-courses",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(courseListValidationSchema),
  getMyCourses
);

router.post(
  "/",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(createCourseValidationSchema),
  createCourse
);

router.get(
  "/:courseId",
  validateRequest(courseIdValidationSchema),
  getCourseById
);

router.put(
  "/:courseId",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(updateCourseValidationSchema),
  updateCourse
);

router.delete(
  "/:courseId",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(courseIdValidationSchema),
  deleteCourse
);

router.patch(
  "/:courseId/publish",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(courseIdValidationSchema),
  publishCourse
);

router.patch(
  "/:courseId/unpublish",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(courseIdValidationSchema),
  unpublishCourse
);

export const CourseRoutes = router;
