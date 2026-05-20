import express from "express";

import {
  signupController,
  loginController,
} from "./AuthController"

const router = express.Router();

/* PUBLIC ROUTES */
router.post("/signup", signupController);
router.post("/login", loginController);

export const AuthRoutes = router;