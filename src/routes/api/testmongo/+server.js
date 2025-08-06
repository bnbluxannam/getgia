import { json } from '@sveltejs/kit';
import { getDb } from '$lib/mongodb.js';

export async function GET() {
  const db = await getDb();
  const products = await db.collection('products').find({}).toArray();
  return json(products);
}