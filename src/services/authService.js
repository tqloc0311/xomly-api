import admin from "../config/firebaseAdmin.js";

const verifyIdToken = async (idToken) => {
  if (!idToken) {
    throw new Error("ID token is required");
  }

  const decodedToken = await admin.auth().verifyIdToken(idToken);
  return decodedToken;
};

export default { verifyIdToken };
