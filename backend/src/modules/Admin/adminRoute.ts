import { Router } from "express";
import { authMiddleware } from "../../middleware/AuthMiddleware";
import { authorizeRoles } from "../../middleware/RoleMiddleware";
import { validateRequest } from "../../middleware/ValiateMiddleware";
import {
  adminUpdateUserStatusValidationSchema,
  adminUpdateUserValidationSchema,
  adminUserIdValidationSchema,
  adminUsersListValidationSchema,
} from "./AdminValidation";
import {
  deleteAdminUser,
  getAdminUserById,
  getAdminUsers,
  updateAdminUser,
  updateAdminUserStatus,
} from "./adminController";

const router = Router();

router.use(authMiddleware, authorizeRoles("admin"));

router.get("/users", validateRequest(adminUsersListValidationSchema), getAdminUsers);
router.get("/users/:userId", validateRequest(adminUserIdValidationSchema), getAdminUserById);
router.put("/users/:userId", validateRequest(adminUpdateUserValidationSchema), updateAdminUser);
router.patch(
  "/users/:userId/status",
  validateRequest(adminUpdateUserStatusValidationSchema),
  updateAdminUserStatus
);
router.delete("/users/:userId", validateRequest(adminUserIdValidationSchema), deleteAdminUser);

export const AdminRoutes = router;
