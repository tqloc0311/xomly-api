import admin from "../config/firebaseAdmin.js";
import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  DEFAULT_ADMIN_NAME,
} from "../config/env.js";

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

const createUser = async (email, password, displayName) => {
  const userRecord = await admin.auth().createUser({
    email,
    password,
    emailVerified: true,
    displayName,
  });
  return userRecord;
};

const createUserWithEmailVerification = async (email) => {
  const existingUser = await checkUser(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const displayName = "User" + Math.floor(Math.random() * 1000000).toString();

  const userRecord = await admin.auth().createUser({
    email,
    emailVerified: false,
    displayName,
  });

  const customToken = await admin.auth().createCustomToken(userRecord.uid);

  const actionCodeSettings = {
    url: `${process.env.FRONTEND_URL}/?token=${customToken}`,
    handleCodeInApp: true,
  };

  const link = await admin
    .auth()
    .generatePasswordResetLink(email, actionCodeSettings);

  return { userRecord, setPasswordLink: link };
};

const createDefaultUser = async () => {
  const existingUser = await checkUser(DEFAULT_ADMIN_EMAIL);
  if (existingUser) {
    return existingUser;
  }
  return createUser(
    DEFAULT_ADMIN_EMAIL,
    DEFAULT_ADMIN_PASSWORD,
    DEFAULT_ADMIN_NAME
  );
};

const getUserByEmail = async (email) => {
  const userRecord = await admin.auth().getUserByEmail(email);
  return userRecord;
};

const getUserByUid = async (uid) => {
  const userRecord = await admin.auth().getUser(uid);
  return userRecord;
};

export default {
  checkUser,
  createUser,
  createUserWithEmailVerification,
  createDefaultUser,
  getUserByEmail,
  getUserByUid,
};
