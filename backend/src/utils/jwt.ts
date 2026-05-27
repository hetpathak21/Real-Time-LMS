import jwt from "jsonwebtoken";

//Define payload type
export interface JwtPayload {
  userId: string;
  email?: string;
  name?: string;
  role: string;
  roles?:string[];
}

//Generate Access Token 
export const generateAccessToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "30m",
  });
};

//Generate Refresh Token
export const generateRefreshToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "30d",
  });
};

//Verify Access Token 
export const verifyAccessToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;
  } catch (err) {
    throw new Error("Invalid or expired access token");
  }
};

//Verify Refresh Token 
export const verifyRefreshToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
    ) as JwtPayload;
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }
};
