import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenUtils.js";
import {
  getRefreshToken,
  storeRefreshToken,
  deleteRefreshToken,
} from "../utils/refreshTokenStorage.js";
import userService from "../services/userService.js";

const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const storedToken = await getRefreshToken(refreshToken);

    if (!storedToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    await deleteRefreshToken(storedToken);

    const decodedUser = { uid: storedToken.userId };
    const newAccessToken = generateAccessToken(decodedUser);

    const newRefreshToken = generateRefreshToken(decodedUser);

    const user = await userService.getUserByUid(decodedUser.uid);

    await storeRefreshToken(decodedUser.uid, newRefreshToken);

    return res.status(200).json({
      credentials: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
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
    console.error("Token refresh error:", error);
    return res.status(500).json({ error: "Error refreshing token" });
  }
};

export default { refreshToken };
