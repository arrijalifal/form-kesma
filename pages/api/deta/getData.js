import db from "@/lib/deta";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;
        res.json(await db.get(email));
    }
}