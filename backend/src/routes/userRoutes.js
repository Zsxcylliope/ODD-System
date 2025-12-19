import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =====================================================
   GET LOGGED-IN USER PROFILE
   - Requires JWT
   - Returns safe user fields only
===================================================== */
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "_id fullname email userCode profileImage"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("PROFILE FETCH ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;