// src/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Lấy từ Render Environment
const client = new MongoClient(uri);
let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(); // Nếu URI đã có db name thì tự động chọn db đó
    console.log("✅ Connected to MongoDB");
  }
  return db;
}

// Nếu bạn cần export getDb để tương thích với code cũ:
export async function getDb() {
  return await connectDB();
}