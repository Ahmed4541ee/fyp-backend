import User from "../models/User.js";
import Chat from "../models/Chat.js";

export const runMigrations = async () => {
  console.log("🚀 Running migrations...");

  // Ensure 'user' collection exists
  const userCount = await User.estimatedDocumentCount();
  if (userCount === 0) {
    await User.create({ username: "testuser", password: "1234" });
    console.log("✅ Added default user: testuser / 1234");
  }

  // Ensure 'chat' collection exists
  await Chat.createCollection();
  console.log("✅ Verified 'chats' collection.");

  console.log("✅ Migrations completed.");
};
