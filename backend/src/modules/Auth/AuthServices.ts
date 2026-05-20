import User from "../../models/UserModel";
import {
  hashPassword,
  comparePassword,
} from "../../utils/bcrypt";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";

import { AppError } from "../../utils/appError";
import { STATUS_CODES } from "../../constants/StatusCodes";
import { AUTH_MESSAGES } from "../../constants/Messages";

/* ---------------- REGISTER ---------------- */
export const signupService = async (data: any) => {
  const { name, email, password, role } = data;

  const existing = await User.findOne({ email });

  if (existing) {
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
  });


  return { user};
};

/* ---------------- LOGIN ---------------- */
export const loginService = async (data: any) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(
      AUTH_MESSAGES.USER_NOT_FOUND,
      STATUS_CODES.NOT_FOUND
    );
  }

  const match = await comparePassword(password, user.password);

  if (!match) {
    throw new AppError(
      AUTH_MESSAGES.INVALID_CREDENTIALS,
      STATUS_CODES.UNAUTHORIZED
    );
  }

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return { user, accessToken, refreshToken };
};

/* ---------------- REFRESH TOKEN ---------------- */
export const refreshTokenService = async (token: string) => {
  if (!token) {
    throw new AppError(
      "Refresh Token Required",
      STATUS_CODES.UNAUTHORIZED
    );
  }

  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new AppError(
      AUTH_MESSAGES.USER_NOT_FOUND,
      STATUS_CODES.NOT_FOUND
    );
  }

  const newAccessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return { accessToken: newAccessToken };
};

/* ---------------- LOGOUT ---------------- */
export const logoutService = async () => {
  // JWT stateless → frontend clears tokens
  return true;
};


/* ---------------- GET ME ---------------- */
export const getMeService = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
  }

  return user;
};

/* ---------------- UPDATE PROFILE ---------------- */
export const updateProfileService = async (userId: string, data: any) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true }
  ).select("-password");

  if (!user) {
    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
  }

  return user;
};

/* ---------------- CHANGE PASSWORD ---------------- */
export const changePasswordService = async (userId: string, data: any) => {
  const { oldPassword, newPassword } = data;

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
  }

  const isMatch = await comparePassword(oldPassword, user.password);

  if (!isMatch) {
    throw new AppError("Old password is incorrect", STATUS_CODES.UNAUTHORIZED);
  }

  const hashed = await hashPassword(newPassword);

  user.password = hashed;
  await user.save();

  return true;
};