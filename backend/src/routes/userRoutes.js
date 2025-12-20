import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import cloudinary from "../lib/cloudinary.js";

const router = express.Router();

/* =====================================================
   GET LOGGED-IN USER PROFILE
===================================================== */
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "_id fullname email userCode profileImage profileCompleted phone region province city"
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

/* =====================================================
   UPDATE USER PROFILE (TEXT FIELDS)
===================================================== */
router.patch("/profile", authMiddleware, async (req, res) => {
  try {
    const allowedFields = [
      "fullname",
      "phone",
      "region",
      "province",
      "city",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    updates.profileCompleted = true;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      { new: true }
    ).select("_id fullname email userCode profileImage profileCompleted");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* =====================================================
   UPDATE PROFILE IMAGE (CLOUDINARY)
===================================================== */
router.patch(
  "/profile-image",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No image uploaded",
        });
      }

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "profiles",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      const user = await User.findByIdAndUpdate(
        req.user.userId,
        {
          profileImage: uploadResult.secure_url,
          profileCompleted: true,
        },
        { new: true }
      ).select("_id fullname profileImage profileCompleted");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "Profile image updated",
        user,
      });
    } catch (error) {
      console.error("CLOUDINARY UPLOAD ERROR:", error);
      res.status(500).json({
        message: "Image upload failed",
      });
    }
  }
);

export default router;