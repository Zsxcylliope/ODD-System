import express from "express";
import Notification from "../models/Notification.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET ALL NOTIFICATIONS */
router.get("/", authMiddleware, async (req, res) => {
  const notifications = await Notification.find({ userId: req.user.id })
    .sort({ createdAt: -1 });

  res.json(notifications);
});

/* MARK AS READ */
router.patch("/:id/read", authMiddleware, async (req, res) => {
  await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { isRead: true }
  );

  res.json({ success: true });
});

/* UNREAD COUNT (for red dot) */
router.get("/unread/count", authMiddleware, async (req, res) => {
  const count = await Notification.countDocuments({
    userId: req.user.id,
    isRead: false,
  });

  res.json({ count });
});

export default router;
