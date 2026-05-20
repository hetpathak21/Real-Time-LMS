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
  courseIdValidation,
  courseListValidation,
  createCourseValidation,
  updateCourseValidation,
} from "../../validators/CourseValidation";
import { validateRequest } from "../../middlewares/validateRequest.middleware";
import { protect } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  courseListValidation,
  validateRequest,
  getPublishedCourses
);

router.get(
  "/my-courses",
  protect,
  authorizeRoles("teacher"),
  courseListValidation,
  validateRequest,
  getMyCourses
);

router.post(
  "/",
  protect,
  authorizeRoles("teacher"),
  createCourseValidation,
  validateRequest,
  createCourse
);

router.get(
  "/:courseId",
  courseIdValidation,
  validateRequest,
  getCourseById
);

router.put(
  "/:courseId",
  protect,
  authorizeRoles("teacher"),
  updateCourseValidation,
  validateRequest,
  updateCourse
);

router.delete(
  "/:courseId",
  protect,
  authorizeRoles("teacher"),
  courseIdValidation,
  validateRequest,
  deleteCourse
);

router.patch(
  "/:courseId/publish",
  protect,
  authorizeRoles("teacher"),
  courseIdValidation,
  validateRequest,
  publishCourse
);

router.patch(
  "/:courseId/unpublish",
  protect,
  authorizeRoles("teacher"),
  courseIdValidation,
  validateRequest,
  unpublishCourse
);

export default router;