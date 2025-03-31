import authService from "../services/authService.js";
import userService from "../services/userService.js";
import { storeRefreshToken } from "../utils/refreshTokenStorage.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenUtils.js";

const login = async (req, res) => {
  const idToken = req.body.idToken;

  if (!idToken) {
    return res.status(400).json({ error: "ID token is required" });
  }

  try {
    const decodedToken = await authService.verifyIdToken(idToken);

    const accessToken = generateAccessToken(decodedToken);
    const refreshToken = generateRefreshToken(decodedToken);

    await storeRefreshToken(decodedToken.uid, refreshToken);

    const user = await userService.getUserByEmail(decodedToken.email);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.disabled) {
      return res.status(401).json({ error: "User is disabled" });
    }

    if (!user.emailVerified) {
      return res.status(401).json({ error: "User email not verified" });
    }

    return res.status(200).json({
      credentials: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        emailVerified: user.emailVerified,
        disabled: user.disabled,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(401).json({ error: "Invalid credentials" });
  }
};

export default { login };
