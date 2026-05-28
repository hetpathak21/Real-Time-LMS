import { Router } from "express";
import {
  createAssignment,
  deleteAssignment,
  getAssignmentSubmissions,
  getAssignmentById,
  getCourseAssignments,
  gradeSubmission,
  publishAssignment,
  submitAssignment,
  updateAssignment,
} from "./assignmentController";
import {
  assignmentIdParamSchema,
  courseIdParamSchema,
  createAssignmentSchema,
  gradeSubmissionSchema,
  publishAssignmentSchema,
  submitAssignmentSchema,
  updateAssignmentSchema,
} from "./assignmentValidation";
import { validateRequest } from "../../middleware/ValiateMiddleware"
import { authMiddleware } from "../../middleware/AuthMiddleware"; 
import { authorizeRoles } from "../../middleware/RoleMiddleware";

const router = Router();

router.post(
  "/course/:courseId",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(createAssignmentSchema),
  createAssignment
);

router.get(
  "/course/:courseId",
  authMiddleware,
  authorizeRoles("teacher", "student", "admin"),
  validateRequest(courseIdParamSchema),
  getCourseAssignments
);

// Backward-compatible alias for the older plural course path.
router.get(
  "/courses/:courseId",
  authMiddleware,
  authorizeRoles("teacher", "student", "admin"),
  validateRequest(courseIdParamSchema),
  getCourseAssignments
);

router.get(
  "/:assignmentId",
  authMiddleware,
  authorizeRoles("teacher", "student", "admin"),
  validateRequest(assignmentIdParamSchema),
  getAssignmentById
);

router.patch(
  "/:assignmentId",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(updateAssignmentSchema),
  updateAssignment
);

// Backward-compatible alias for clients still using PUT.
router.put(
  "/:assignmentId",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(updateAssignmentSchema),
  updateAssignment
);

router.delete(
  "/:assignmentId",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(assignmentIdParamSchema),
  deleteAssignment
);

router.patch(
  "/:assignmentId/publish",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(publishAssignmentSchema),
  publishAssignment
);

router.post(
  "/:assignmentId/submissions",
  authMiddleware,
  authorizeRoles("student"),
  validateRequest(submitAssignmentSchema),
  submitAssignment
);

router.get(
  "/:assignmentId/submissions",
  authMiddleware,
  authorizeRoles("teacher", "admin"),
  validateRequest(assignmentIdParamSchema),
  getAssignmentSubmissions
);

router.patch(
  "/submissions/:submissionId/grade",
  authMiddleware,
  authorizeRoles("teacher"),
  validateRequest(gradeSubmissionSchema),
  gradeSubmission
);

export default router;
