"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assignmentController_1 = require("./assignmentController");
const assignmentValidation_1 = require("./assignmentValidation");
const ValiateMiddleware_1 = require("../../middleware/ValiateMiddleware");
const AuthMiddleware_1 = require("../../middleware/AuthMiddleware");
const RoleMiddleware_1 = require("../../middleware/RoleMiddleware");
const router = (0, express_1.Router)();
router.post("/course/:courseId", AuthMiddleware_1.authMiddleware, (0, RoleMiddleware_1.authorizeRoles)("teacher"), (0, ValiateMiddleware_1.validateRequest)(assignmentValidation_1.createAssignmentSchema), assignmentController_1.createAssignment);
router.get("/course/:courseId", AuthMiddleware_1.authMiddleware, (0, RoleMiddleware_1.authorizeRoles)("teacher", "student", "admin"), (0, ValiateMiddleware_1.validateRequest)(assignmentValidation_1.courseIdParamSchema), assignmentController_1.getCourseAssignments);
// Backward-compatible alias for the older plural course path.
router.get("/courses/:courseId", AuthMiddleware_1.authMiddleware, (0, RoleMiddleware_1.authorizeRoles)("teacher", "student", "admin"), (0, ValiateMiddleware_1.validateRequest)(assignmentValidation_1.courseIdParamSchema), assignmentController_1.getCourseAssignments);
router.get("/:assignmentId", AuthMiddleware_1.authMiddleware, (0, RoleMiddleware_1.authorizeRoles)("teacher", "student", "admin"), (0, ValiateMiddleware_1.validateRequest)(assignmentValidation_1.assignmentIdParamSchema), assignmentController_1.getAssignmentById);
router.patch("/:assignmentId", AuthMiddleware_1.authMiddleware, (0, RoleMiddleware_1.authorizeRoles)("teacher"), (0, ValiateMiddleware_1.validateRequest)(assignmentValidation_1.updateAssignmentSchema), assignmentController_1.updateAssignment);
// Backward-compatible alias for clients still using PUT.
router.put("/:assignmentId", AuthMiddleware_1.authMiddleware, (0, RoleMiddleware_1.authorizeRoles)("teacher"), (0, ValiateMiddleware_1.validateRequest)(assignmentValidation_1.updateAssignmentSchema), assignmentController_1.updateAssignment);
router.delete("/:assignmentId", AuthMiddleware_1.authMiddleware, (0, RoleMiddleware_1.authorizeRoles)("teacher"), (0, ValiateMiddleware_1.validateRequest)(assignmentValidation_1.assignmentIdParamSchema), assignmentController_1.deleteAssignment);
router.patch("/:assignmentId/publish", AuthMiddleware_1.authMiddleware, (0, RoleMiddleware_1.authorizeRoles)("teacher"), (0, ValiateMiddleware_1.validateRequest)(assignmentValidation_1.publishAssignmentSchema), assignmentController_1.publishAssignment);
router.post("/:assignmentId/submissions", AuthMiddleware_1.authMiddleware, (0, RoleMiddleware_1.authorizeRoles)("student"), (0, ValiateMiddleware_1.validateRequest)(assignmentValidation_1.submitAssignmentSchema), assignmentController_1.submitAssignment);
router.get("/:assignmentId/submissions", AuthMiddleware_1.authMiddleware, (0, RoleMiddleware_1.authorizeRoles)("teacher", "admin"), (0, ValiateMiddleware_1.validateRequest)(assignmentValidation_1.assignmentIdParamSchema), assignmentController_1.getAssignmentSubmissions);
router.patch("/submissions/:submissionId/grade", AuthMiddleware_1.authMiddleware, (0, RoleMiddleware_1.authorizeRoles)("teacher"), (0, ValiateMiddleware_1.validateRequest)(assignmentValidation_1.gradeSubmissionSchema), assignmentController_1.gradeSubmission);
exports.default = router;
