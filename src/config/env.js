import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const S3_EXPIRES_IN_SECONDS = 60;
export const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL;
export const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD;
export const DEFAULT_ADMIN_NAME = process.env.DEFAULT_ADMIN_NAME;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const DYNAMODB_REFRESH_TOKEN_TABLE_NAME =
  process.env.DYNAMODB_REFRESH_TOKEN_TABLE_NAME;
