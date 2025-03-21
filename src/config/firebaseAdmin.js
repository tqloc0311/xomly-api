import admin from "firebase-admin";
import serviceAccount from "../../secret/firebase-service-account-key.json" with { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
