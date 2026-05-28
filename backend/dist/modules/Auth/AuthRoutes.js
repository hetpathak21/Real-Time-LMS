"use strict";
// import express from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
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
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("./AuthController");
const AuthMiddleware_1 = require("../../middleware/AuthMiddleware");
const ValiateMiddleware_1 = require("../../middleware/ValiateMiddleware");
const AuthValidation_1 = require("./AuthValidation");
const uploadMiddleware_1 = require("../../middleware/uploadMiddleware");
const router = express_1.default.Router();
/* ---------------- PUBLIC ROUTES ---------------- */
router.post("/signup", (0, ValiateMiddleware_1.validateRequest)(AuthValidation_1.signupValidationSchema), AuthController_1.signupController);
router.post("/login", (0, ValiateMiddleware_1.validateRequest)(AuthValidation_1.loginValidationSchema), AuthController_1.loginController);
router.post("/refresh-token", (0, ValiateMiddleware_1.validateRequest)(AuthValidation_1.refreshTokenValidationSchema), AuthController_1.refreshTokenController);
/* ---------------- PROTECTED ROUTES ---------------- */
router.post("/logout", AuthMiddleware_1.authMiddleware, AuthController_1.logoutController);
router.get("/me", AuthMiddleware_1.authMiddleware, AuthController_1.getMeController);
router.put("/profile", AuthMiddleware_1.authMiddleware, uploadMiddleware_1.profileUpload.single("avatar"), (0, ValiateMiddleware_1.validateRequest)(AuthValidation_1.updateProfileValidationSchema), AuthController_1.updateProfileController);
router.put("/change-password", AuthMiddleware_1.authMiddleware, (0, ValiateMiddleware_1.validateRequest)(AuthValidation_1.changePasswordValidationSchema), AuthController_1.changePasswordController);
exports.AuthRoutes = router;
