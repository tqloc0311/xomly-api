import userService from "../services/userService.js";

const createUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const { userRecord, setPasswordLink } =
      await userService.createUserWithEmailVerification(email);

    return res.status(201).json({
      message:
        "User created successfully. Please check your email to set your password.",
      userId: userRecord.uid,
      email: userRecord.email,
      setPasswordLink,
    });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(409).json({ error: error.message });
    }
    console.error("Create user error:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

export default { createUser };
