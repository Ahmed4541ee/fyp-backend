import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  const { userId, messages, title } = req.body;

  try {
    const chat = await Chat.create({ userId, messages, title: title || "New Chat" });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.params.userId });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
router.put("/:id", async (req, res) => {
  try {
    const { messages, title } = req.body;
    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      { ...(messages ? { messages } : {}), ...(title ? { title } : {}) },
      { new: true }
    );
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Chat.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Chat not found" });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

