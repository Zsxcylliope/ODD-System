import 'dotenv/config';
import mongoose from 'mongoose';
import { seedProducts } from './src/seeders/productSeeder.js';
import connectDB from './src/lib/db.js';

await connectDB();

const ADMIN_USER_ID = 'PUT_ADMIN_OBJECT_ID_HERE';

await seedProducts(ADMIN_USER_ID);

console.log('🌱 Seeding finished');
process.exit(0);
