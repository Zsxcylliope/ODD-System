import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Generate token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { fullname, email, phone, password, confirmPassword } = req.body;

        // Check required fields
        if (!fullname || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Password match check
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Prevent duplicate email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Random avatar
        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;

        // Create new user
        const user = new User({
            fullname,
            email,
            phone,
            password,
            profileImage,
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                profileImage: user.profileImage,
            },
        });

    } catch (error) {
        console.error("Error in register route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Compare hashed password
        const isMatch = await user.matchPassword(password); 
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                profileImage: user.profileImage,
            },
        });

    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
