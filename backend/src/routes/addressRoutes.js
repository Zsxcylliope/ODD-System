import express from "express";
import Address from "../models/Address.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const addresses = await Address.find({ userId: req.user.userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });
  res.json(addresses);
});

router.post("/", authMiddleware, async (req, res) => {
  if (req.body.isDefault) {
    await Address.updateMany(
      { userId: req.user.userId },
      { isDefault: false }
    );
  }

  const address = await Address.create({
    ...req.body,
    userId: req.user.userId,
  });

  res.status(201).json(address);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const address = await Address.findOne({
    _id: req.params.id,
    userId: req.user.userId,
  });

  if (!address) {
    return res.status(404).json({ message: "Address not found" });
  }

  if (req.body.isDefault) {
    await Address.updateMany(
      { userId: req.user.userId },
      { isDefault: false }
    );
  }

  Object.assign(address, req.body);
  await address.save();
  res.json(address);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Address.deleteOne({
    _id: req.params.id,
    userId: req.user.userId,
  });
  res.json({ message: "Address deleted" });
});

export default router;