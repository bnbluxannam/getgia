import { json } from '@sveltejs/kit';
import { getDb } from '$lib/mongodb.js';

export async function GET() {
    try {
        const db = await getDb();
        const collections = await db.listCollections().toArray();
        return json({
            success: true,
            collections: collections.map(c => c.name)
        });
    } catch (error) {
        console.error(error);
        return json({ success: false, message: error.message }, { status: 500 });
    }
}