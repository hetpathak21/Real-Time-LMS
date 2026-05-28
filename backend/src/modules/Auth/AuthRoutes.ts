// import express from "express";

// import {
//   signupController,
//   loginController,
//   refreshTokenController,
//   logoutController,
// } from "./AuthController"
// import { authMiddleware } from "../../middleware/AuthMiddleware";

// const router = express.Router();

// /* PUBLIC ROUTES */
// router.post("/signup", signupController);
// router.post("/login", loginController);
// router.post("/refresh-token",refreshTokenController);
// router.post("/logout",authMiddleware,logoutController)

// export const AuthRoutes = router;

import express from "express";

import {
  signupController,
  loginController,
  refreshTokenController,
  logoutController,
  getMeController,
  updateProfileController,
  changePasswordController,
  getTeachersController,
} from "./AuthController";

import { authMiddleware } from "../../middleware/AuthMiddleware";
import { validateRequest } from "../../middleware/ValiateMiddleware";
import {
  changePasswordValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
  signupValidationSchema,
  updateProfileValidationSchema,
} from "./AuthValidation";
import { profileUpload } from "../../middleware/uploadMiddleware";

const router = express.Router();

/* ---------------- PUBLIC ROUTES ---------------- */
router.post(
  "/signup",
  validateRequest(signupValidationSchema),
  signupController,
);
router.post("/login", validateRequest(loginValidationSchema), loginController);
router.post(
  "/refresh-token",
  validateRequest(refreshTokenValidationSchema),
  refreshTokenController,
);

/* ---------------- PROTECTED ROUTES ---------------- */
router.post("/logout", authMiddleware, logoutController);

router.get("/me", authMiddleware, getMeController);

router.get(
  "/teachers",
  authMiddleware,
  getTeachersController
);

router.put(
  "/profile",
  authMiddleware,
  profileUpload.single("avatar"),
  validateRequest(updateProfileValidationSchema),
  updateProfileController,
);

router.put(
  "/change-password",
  authMiddleware,
  validateRequest(changePasswordValidationSchema),
  changePasswordController,
);

export const AuthRoutes = router;
