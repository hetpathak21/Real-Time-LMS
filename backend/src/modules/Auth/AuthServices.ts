import User from "../../models/UserModel";
import { hashPassword, comparePassword } from "../../utils/bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";
import { AppError } from "../../utils/appError";
import { STATUS_CODES } from "../../constants/StatusCodes";
import { AUTH_MESSAGES } from "../../constants/Messages";
import {
  SignupPayload,
  LoginPayload,
  UpdateProfilePayload,
  ChangePasswordPayload,
} from "./AuthTypes";

/* ---------------- REGISTER ---------------- */
export const signupService = async (data: SignupPayload) => {
  const { name, email, password, role } = data;

  const existing = await User.findOne({ email });

  if (existing) {
    throw new AppError(
      AUTH_MESSAGES.USER_ALREADY_EXISTS,
      STATUS_CODES.CONFLICT,
    );
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "student",
  });

  const safeUser = await User.findById(user._id).select("-password");

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name
  });

  return { user: safeUser, token: accessToken, refreshToken };
};

/* ---------------- LOGIN ---------------- */
export const loginService = async (data: LoginPayload) => {
  const { email, password } = data;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
  }

  const match = await comparePassword(password, user.password);

  if (!match) {
    throw new AppError(
      AUTH_MESSAGES.INVALID_CREDENTIALS,
      STATUS_CODES.UNAUTHORIZED,
    );
  }

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
  });

  const safeUser = await User.findById(user._id).select("-password");

  return { user: safeUser, token: accessToken, refreshToken };
};

/* ---------------- REFRESH TOKEN ---------------- */
export const refreshTokenService = async (token: string) => {
  if (!token) {
    throw new AppError("Refresh Token Required", STATUS_CODES.UNAUTHORIZED);
  }

  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
  }

  const newAccessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
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
export const updateProfileService = async (
  userId: string,
  data: UpdateProfilePayload,
) => {
  const updateData = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  );

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true },
  ).select("-password");

  if (!user) {
    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
  }

  return user;
};

/* ---------------- CHANGE PASSWORD ---------------- */
export const changePasswordService = async (
  userId: string,
  data: ChangePasswordPayload,
) => {
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

/* ---------------- GET TEACHERS ---------------- */
export const getTeachersService = async () => {
  const teachers = await User.find(
    { role: "teacher" },
    {
      name: 1,
      email: 1,
      avatar: 1,
      role: 1,
    }
  );

  return teachers;
};