import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const secret = process.env.JWT_SECRET || "dev-secret";
    const token = jwt.sign({ id: user._id, username: user.username }, secret, {
      expiresIn: "7d",
    });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    const secret = process.env.JWT_SECRET || "dev-secret";
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, secret, {
      expiresIn: "7d",
    });
    res.status(201).json({ token, user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
