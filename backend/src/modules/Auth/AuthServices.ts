import User from "../../models/UserModel"
import {
  hashPassword,
  comparePassword,
} from "../../utils/bcrypt";
import { AppError } from "../../utils/appError";
import { STATUS_CODES } from "../../constants/StatusCodes"
import { AUTH_MESSAGES } from "../../constants/Messages";
import {
  generateAccessToken,
} from "../../utils/jwt";
import { Types } from "mongoose";

/* ---------------- SIGNUP ---------------- */
export const signupService = async (data: {
  name: string;
  email: string;
  password: string;
  role?: "student" | "teacher" | "admin";
}) => {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(
      AUTH_MESSAGES.USER_ALREADY_EXISTS,
      STATUS_CODES.CONFLICT
    );
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "student",
    isVerified: true, 
  });

  return user;
};

/* ---------------- LOGIN ---------------- */
export const loginService = async (data: {
  email: string;
  password: string;
}) => {
  if (!data) {
    throw new AppError(
      "Request body is missing",
      STATUS_CODES.BAD_REQUEST
    );
  }

  const { email, password } = data;

  if (!email || !password) {
    throw new AppError(
      "Email and password required",
      STATUS_CODES.BAD_REQUEST
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(
      AUTH_MESSAGES.USER_NOT_FOUND,
      STATUS_CODES.NOT_FOUND
    );
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new AppError(
      AUTH_MESSAGES.INVALID_CREDENTIALS,
      STATUS_CODES.UNAUTHORIZED
    );
  }

  const accessToken = generateAccessToken({
    userId: user._id as Types.ObjectId,
    role: user.role,
    email: user.email,
  });

  await User.updateOne(
    { _id: user._id },
    { lastLogin: new Date() }
  );

  return {
    user,
    accessToken,
  };
};
/* ---------------- LOGOUT (JWT ONLY) ---------------- */
export const logoutService = async () => {
  // For JWT stateless auth → handled in frontend
  return true;
};