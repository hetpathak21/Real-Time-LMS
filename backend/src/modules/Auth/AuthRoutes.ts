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
} from "./AuthController";

import { authMiddleware } from "../../middleware/AuthMiddleware";
import { validateRequest } from "../../middleware/ValiateMiddleware";
import { changePasswordSchema, loginSchema, signupSchema, updateProfileSchema } from "./AuthValidation";

const router = express.Router();

/* ---------------- PUBLIC ROUTES ---------------- */
router.post("/signup",validateRequest(signupSchema), signupController);
router.post("/login",validateRequest(loginSchema), loginController);
router.post("/refresh-token", refreshTokenController);

/* ---------------- PROTECTED ROUTES ---------------- */
router.post("/logout", authMiddleware, logoutController);

router.get("/me", authMiddleware, getMeController);

router.put("/profile", authMiddleware,validateRequest(updateProfileSchema), updateProfileController);

router.put("/change-password", authMiddleware, validateRequest(changePasswordSchema),changePasswordController);

export const AuthRoutes = router;