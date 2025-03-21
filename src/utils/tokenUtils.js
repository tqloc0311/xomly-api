import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env.js";

export const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.uid }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.uid }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
