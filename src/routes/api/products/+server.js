import { json } from "@sveltejs/kit";
import { connectDB } from "$lib/mongodb";

export async function GET() {
  const db = await connectDB();
  const products = await db.collection("products").find().toArray();
  return json(products);
}

export async function POST({ request }) {
  const db = await connectDB();
  const body = await request.json();

  // Thêm sản phẩm mới
  const result = await db.collection("products").insertOne({
    name: body.name,
    image: body.image,
    nguyen_kim: body.nguyen_kim ?? null,
    dien_may_xanh: body.dien_may_xanh ?? null,
    cho_lon: body.cho_lon ?? null
  });

  return json({ insertedId: result.insertedId });
}