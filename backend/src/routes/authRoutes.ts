import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log(username);

    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (username.length < 3) {
      res
        .status(400)
        .json({ message: "Username must be at least 3 characters" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(409).json({ message: "Email already exists" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({ message: "Username already exists" });
    }

    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    const user = new User({
      username,
      email,
      password,
      profileImage,
    });

    await user.save();

    const token = generateToken(user._id.toString());

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.log("ERROR_REGISTER " + err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  res.send("Login route");
});

export default router;
