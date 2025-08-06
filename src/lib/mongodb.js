// src/lib/server/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/getgia";
const dbName = "getgia";

// Sử dụng biến toàn cục để tránh tạo nhiều kết nối khi hot reload
let client;
let db;

export async function connectDB() {
  if (db) return db;

  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await client.connect();
    console.log("✅ Kết nối MongoDB thành công:", uri);
  }

  db = client.db(dbName);
  return db;
}