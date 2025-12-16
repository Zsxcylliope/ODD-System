import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const router = express.Router();

/* =====================================================
   JWT TOKEN GENERATOR
===================================================== */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

/* =====================================================
   EMAIL TRANSPORTER (GMAIL)
===================================================== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

/* =====================================================
   REGISTER
   - Creates user
   - Password auto-hashed by schema
   - Email forced to lowercase
===================================================== */
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, phone, password, confirmPassword } = req.body;
    const emailLower = email.toLowerCase();

    if (!fullname || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${emailLower}`;

    const user = new User({
      fullname,
      email: emailLower,
      phone,
      password,
      profileImage,
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* =====================================================
   LOGIN
   - Finds user using LOWERCASE email
   - Compares hashed password
===================================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: emailLower });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* =====================================================
   FORGOT PASSWORD
   - Generates OTP
   - Saves HASHED OTP
   - Sends OTP via email
===================================================== */
router.post("/forgot-password", async (req, res) => {
  try {
    const emailLower = req.body.email.toLowerCase();

    const user = await User.findOne({ email: emailLower });

    // Prevent email enumeration
    if (!user) {
      return res.json({
        message: "If the email exists, a code was sent.",
      });
    }

    const resetCode = Math.floor(1000 + Math.random() * 9000).toString();

    const hashedCode = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");

    user.resetCode = hashedCode;
    user.resetCodeExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Code",
      html: `
        <h2>Password Reset</h2>
        <p>Your verification code is:</p>
        <h1>${resetCode}</h1>
        <p>This code expires in 10 minutes.</p>
      `,
    });

    res.json({ message: "Verification code sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* =====================================================
   VERIFY CODE
   - Confirms OTP is valid & not expired
===================================================== */
router.post("/verify-code", async (req, res) => {
  try {
    const emailLower = req.body.email.toLowerCase();
    const { code } = req.body;

    const hashedCode = crypto
      .createHash("sha256")
      .update(code)
      .digest("hex");

    const user = await User.findOne({
      email: emailLower,
      resetCode: hashedCode,
      resetCodeExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    res.json({ message: "Code verified" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* =====================================================
   RESET PASSWORD
   - Updates password
   - Clears OTP fields
   - Password auto-hashed by schema
===================================================== */
router.post("/reset-password", async (req, res) => {
  try {
    const emailLower = req.body.email.toLowerCase();
    const { code, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const hashedCode = crypto
      .createHash("sha256")
      .update(code)
      .digest("hex");

    const user = await User.findOne({
      email: emailLower,
      resetCode: hashedCode,
      resetCodeExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.password = password; // auto-hashed
    user.resetCode = undefined;
    user.resetCodeExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;