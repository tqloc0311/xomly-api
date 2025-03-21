import authService from "../services/authService.js";
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

    return res.status(200).json({
      message: "Login successful",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(401).json({ error: "Invalid credentials" });
  }
};

export default { login };
