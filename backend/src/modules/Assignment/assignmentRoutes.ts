import { Router } from "express";
import {
  createAssignment,
  deleteAssignment,
  getAssignmentById,
  getCourseAssignments,
  updateAssignment,
} from "./assignmentController";
import {
  assignmentIdParamSchema,
  courseIdParamSchema,
  createAssignmentSchema,
  updateAssignmentSchema,
} from "./assignmentValidation";
// import { validateZod } from "../../middleware/ValiateMiddleware";
import { validateRequest } from "../../middleware/ValiateMiddleware"
import { authMiddleware } from "../../middleware/AuthMiddleware"; 
import { authorizeRoles } from "../../middleware/RoleMiddleware";

const router = Router();

router.post(
  "/courses/:courseId",
  authMiddleware,
  authorizeRoles("teacher","admin"),
  validateRequest(createAssignmentSchema),
  createAssignment
);

router.get(
  "/courses/:courseId",
  validateRequest(courseIdParamSchema),
  getCourseAssignments
);

router.get(
  "/:assignmentId",
  validateRequest(assignmentIdParamSchema),
  getAssignmentById
);

router.put(
  "/:assignmentId",
  authMiddleware,
  authorizeRoles("teacher","admin"),
  validateRequest(updateAssignmentSchema),
  updateAssignment
);

router.delete(
  "/:assignmentId",
  authMiddleware,
  authorizeRoles("teacher","admin"),
  validateRequest(assignmentIdParamSchema),
  deleteAssignment
);

export default router;