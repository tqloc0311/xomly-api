import admin from "../config/firebaseAdmin.js";
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from "../config/env.js";

const checkUser = async (email) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return userRecord;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return null;
    }
    throw error;
  }
};

const createUser = async (email, password) => {
  const userRecord = await admin.auth().createUser({
    email,
    password,
    emailVerified: true,
  });
  return userRecord;
};

const createUserWithEmailVerification = async (email) => {
  const existingUser = await checkUser(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const userRecord = await admin.auth().createUser({
    email,
    emailVerified: false,
  });

  const actionCodeSettings = {
    url: `${process.env.FRONTEND_URL}/reset-password`,
    handleCodeInApp: true,
  };

  await admin.auth().generatePasswordResetLink(email, actionCodeSettings);

  return { userRecord };
};

const createDefaultUser = async () => {
  const existingUser = await checkUser(DEFAULT_ADMIN_EMAIL);
  if (existingUser) {
    return existingUser;
  }
  return createUser(DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD);
};

export default {
  checkUser,
  createUser,
  createUserWithEmailVerification,
  createDefaultUser,
};
