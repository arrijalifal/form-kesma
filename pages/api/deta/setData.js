import db from "@/lib/deta";
export default async function handler(req, res) {
    if (method === "POST") {
        const { data , key} = req.body;
        await db.put(data, key);
    }
}