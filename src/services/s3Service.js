import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/aws.js";
import { S3_BUCKET_NAME, S3_EXPIRES_IN_SECONDS } from "../config/env.js";

export const generatePresignedUrl = async (key) => {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: S3_EXPIRES_IN_SECONDS,
  });

  return url;
};

export const getObject = async (key) => {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);
  return response.Body;
};
