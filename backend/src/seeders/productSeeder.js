import Product from '../models/Product.js';
import cloudinary from '../lib/cloudinary.js';
import { products } from './productData.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seedProducts = async (userId) => {
  for (const item of products) {

    const exists = await Product.findOne({ name: item.name });
    if (exists) continue;

    const imagePath = path.join(
      __dirname,
      '../assets/images',
      item.image
    );

    if (!fs.existsSync(imagePath)) {
      console.warn(`Image not found: ${imagePath}`);
      continue;
    }

    const upload = await cloudinary.uploader.upload(imagePath, {
      folder: 'products',
    });

    await Product.create({
      name: item.name,
      category: item.category,
      description: `${item.name} - ${item.category}`,
      price: item.price,
      quantity: 100,
      stock: 100,
      rating: item.rating,
      image: upload.secure_url,
    });

    console.log(`✔ Seeded: ${item.name}`);
  }

  console.log('✅ Product seeding completed');
};
