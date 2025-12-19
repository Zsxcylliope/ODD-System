import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/**
 * GET PRODUCTS BY CATEGORY
 * /api/products?category=Allergy
 */
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    const query = {};
    if (category) query.category = category;
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// TOP 6 BEST DEALS (HIGHEST RATING)
router.get("/top", async (req, res) => {
  try {
    const products = await Product.find({ stock: { $gt: 0 } })
      .sort({ rating: -1 })
      .limit(6);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch top products" });
  }
});


export default router;
