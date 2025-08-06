import { json } from "@sveltejs/kit";
import { connectDB } from "$lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT({ params, request }) {
  const db = await connectDB();
  const body = await request.json();

  // Kiểm tra id hợp lệ
  if (!ObjectId.isValid(params.id)) {
    return json({ error: "Invalid ID" }, { status: 400 });
  }

  await db.collection("products").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: {
        name: body.name,
        image: body.image,
        nguyen_kim: body.nguyen_kim ?? null,
        dien_may_xanh: body.dien_may_xanh ?? null,
        cho_lon: body.cho_lon ?? null
    } }
  );

  return json({ success: true });
}

export async function DELETE({ params }) {
  const db = await connectDB();

  if (!ObjectId.isValid(params.id)) {
    return json({ error: "Invalid ID" }, { status: 400 });
  }

  await db.collection("products").deleteOne({ _id: new ObjectId(params.id) });

  return json({ success: true });
}