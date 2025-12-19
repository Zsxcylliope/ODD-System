import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // ✅ AUTO-GENERATED USER ID
    userCode: {
      type: String,
      unique: true,
    },

    // ✅ DiceBear avatar (default)
    profileImage: {
      type: String,
    },

    resetCode: {
      type: String,
    },

    resetCodeExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash password + generate ID + avatar
userSchema.pre("save", async function (next) {
  // Generate userCode ONCE
  if (!this.userCode) {
    this.userCode = Math.floor(
      100000000 + Math.random() * 900000000
    ).toString();
  }

  // Set DiceBear avatar if none provided
  if (!this.profileImage) {
    this.profileImage = `https://api.dicebear.com/7.x/avataaars/png?seed=${this.email}`;
  }

  // Hash password only if modified
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;