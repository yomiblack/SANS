import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

// Explicitly point to the .env.local file
dotenv.config({ path: path.resolve('./.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!MONGODB_URI) throw new Error("MONGODB_URI is not set!");
if (!ADMIN_EMAIL || !ADMIN_PASSWORD)
    throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD not set in .env.local");

async function seedAdmin() {
    await mongoose.connect(MONGODB_URI);

    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
        console.log("Admin already exists");
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await User.create({
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
    });

    console.log("✅ Admin user created successfully");
    process.exit(0);
}

seedAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});
