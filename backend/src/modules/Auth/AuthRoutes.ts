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

const router = express.Router();

/* ---------------- PUBLIC ROUTES ---------------- */
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/refresh-token", refreshTokenController);

/* ---------------- PROTECTED ROUTES ---------------- */
router.post("/logout", authMiddleware, logoutController);

router.get("/me", authMiddleware, getMeController);

router.put("/profile", authMiddleware, updateProfileController);

router.put("/change-password", authMiddleware, changePasswordController);

export const AuthRoutes = router;