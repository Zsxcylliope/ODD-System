import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE ORDER */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, subtotal, deliveryFee, total, paymentMethod } = req.body;

  const order = await Order.create({
    userId: req.user.id, // ✅ authoritative source
    items,
    subtotal,
    deliveryFee,
    total,
    paymentMethod,
    status: "to_receive",
  });

  res.status(201).json(order);
} catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET USER ORDERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: req.body.status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
