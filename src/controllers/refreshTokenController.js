import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenUtils.js";
import {
  getRefreshToken,
  storeRefreshToken,
  deleteRefreshToken,
} from "../utils/refreshTokenStorage.js";

const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const storedToken = await getRefreshToken(refreshToken);

    console.log(
      "🚀 ~ refreshTokenController.js:21 ~ refreshToken ~ storedToken:",
      storedToken
    );

    if (!storedToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    await deleteRefreshToken(storedToken);

    const decodedUser = { uid: storedToken.userId };
    const newAccessToken = generateAccessToken(decodedUser);

    console.log(
      "🚀 ~ refreshTokenController.js:30 ~ refreshToken ~ decodedUser:",
      decodedUser
    );

    const newRefreshToken = generateRefreshToken(decodedUser);

    await storeRefreshToken(decodedUser.uid, newRefreshToken);

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    return res.status(500).json({ error: "Error refreshing token" });
  }
};

export default { refreshToken };
