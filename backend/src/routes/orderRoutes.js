import express from "express";
import Order from "../models/Order.js";
import Notification from "../models/Notification.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

/* CREATE ORDER */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, subtotal, deliveryFee, total, paymentMethod } = req.body;

    const order = await Order.create({
      userId: req.user.userId, // ✅ authoritative source
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      status: "to_receive",
    });

    await Notification.create({
      userId: req.user.userId,
      orderId: order._id,
      type: "order_confirmed",
      message: `Your order #${order._id} has been confirmed.`,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET USER ORDERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { status: req.body.status },
      { new: true }
    );

    if (req.body.status === "completed") {
      await Notification.create({
        userId: req.user.userId,
        orderId: order._id,
        type: "order_received",
        message: `Order #${order._id} has been received.`,
      });
    }

    if (req.body.status === "cancelled") {
      await Notification.create({
        userId: req.user.userId,
        orderId: order._id,
        type: "order_cancelled",
        message: `Order #${order._id} has been cancelled.`,
      });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
