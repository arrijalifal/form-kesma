import db from "@/lib/deta";

export default async function handler(req, res) {
    if (req.method === "PATCH") {
        const { key, data } = req.body;
        res.json(await db.update({data}, key));
    }
}