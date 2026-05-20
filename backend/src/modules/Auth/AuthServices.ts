import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/UserModel";
import { AUTH_MESSAGES } from "../../constants/Messages"
import AppError from "../../utils/appError"
import { STATUS_CODES } from "../../constants/statusCodes";

const signupUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new AppError(
      STATUS_CODES.CONFLICT,
      AUTH_MESSAGES.USER_ALREADY_EXISTS
    );
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    10
  );

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({
    email: payload.email,
  }).select("+password");

  if (!user) {
    throw new AppError(
      STATUS_CODES.NOT_FOUND,
      AUTH_MESSAGES.USER_NOT_FOUND
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(
      STATUS_CODES.UNAUTHORIZED,
      AUTH_MESSAGES.INVALID_CREDENTIALS
    );
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    accessToken: token,
    user,
  };
};

export const AuthService = {
  signupUser,
  loginUser,
};