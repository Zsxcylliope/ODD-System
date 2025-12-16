import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

/* ================= EMAIL ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

/* ================= JWT ================= */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { fullname, email, phone, password, confirmPassword } = req.body;
    const emailLower = email.toLowerCase();

    if (!fullname || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const exists = await User.findOne({ email: emailLower });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${emailLower}`;

    const user = await User.create({
      fullname,
      email: emailLower,
      phone,
      password,
      profileImage,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "Registration successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();

    const user = await User.findOne({ email: emailLower });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= FORGOT PASSWORD (SEND CODE) ================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const emailLower = email.toLowerCase();

    const user = await User.findOne({ email: emailLower });

    // Prevent email enumeration
    if (!user) {
      return res.json({
        message: "If the email exists, a code was sent",
      });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const hashedCode = crypto
      .createHash("sha256")
      .update(code)
      .digest("hex");

    user.resetCode = hashedCode;
    user.resetCodeExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Code",
      html: `
        <h2>Password Reset</h2>
        <p>Your verification code is:</p>
        <h1>${code}</h1>
        <p>This code expires in 10 minutes.</p>
      `,
    });

    res.json({ message: "Verification code sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= VERIFY CODE ================= */
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const emailLower = email.toLowerCase();

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
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;
    const emailLower = email.toLowerCase();

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

    user.password = password; // 🔐 auto-hashed
    user.resetCode = undefined;
    user.resetCodeExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
