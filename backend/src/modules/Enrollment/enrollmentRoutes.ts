import { Router } from "express";
import {
  enrollCourse,
  getCourseStudents,
  getEnrollmentProgress,
  getMyEnrolledCourses,
  updateLastAccessed,
} from "./enrollmentController";
import {
  courseIdParamSchema,
  courseIdWithQuerySchema,
  enrollmentListQuerySchema,
} from "./enrollmentValidation";
// import { validateZod } from "../../middleware/validateZod.middleware";
import { validateRequest } from "../../middleware/ValiateMiddleware";
import { authMiddleware } from "../../middleware/AuthMiddleware";
import { authorizeRoles } from "../../middleware/RoleMiddleware";

const router = Router();

router.post(
  "/courses/:courseId/enroll",
  authMiddleware,
  authorizeRoles("student","admin"),
  validateRequest(courseIdParamSchema),
  enrollCourse
);

router.get(
  "/my-enrolled-courses",
  authMiddleware,
  authorizeRoles("student","admin"),
  validateRequest(enrollmentListQuerySchema),
  getMyEnrolledCourses
);

router.get(
  "/:courseId/progress",
  authMiddleware,
  authorizeRoles("student","admin"),
  validateRequest(courseIdParamSchema),
  getEnrollmentProgress
);

router.patch(
  "/:courseId/last-accessed",
  authMiddleware,
  authorizeRoles("student","admin"),
  validateRequest(courseIdParamSchema),
  updateLastAccessed
);

router.get(
  "/courses/:courseId/students",
  authMiddleware,
  authorizeRoles("teacher","admin"),
  validateRequest(courseIdWithQuerySchema),
  getCourseStudents
);

export default router;