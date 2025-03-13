import { generatePresignedUrl } from "../services/s3Service.js";
import { S3_BUCKET_NAME, AWS_REGION } from "../config/env.js";

export const getPresignedUrl = async (req, res, next) => {
  try {
    const { key } = req.body;
    const presignedUrl = await generatePresignedUrl(key);

    const publicUrl = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;

    res.json({ presignedUrl, publicUrl });
  } catch (error) {
    next(error);
  }
};
