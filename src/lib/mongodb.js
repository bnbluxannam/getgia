import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);
let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(); // Mongo sẽ tự lấy db từ URI nếu có
    console.log('✅ Connected to MongoDB');
  }
  return db;
}

export async function getDb() {
  return await connectDB();
}
