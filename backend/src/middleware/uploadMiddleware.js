import multer from "multer";

// store file in memory (required for Cloudinary stream upload)
const storage = multer.memoryStorage();

export const upload = multer({ storage });