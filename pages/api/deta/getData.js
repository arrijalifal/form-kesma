import db from "@/lib/deta";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;
        const response = await db.get(email);
        console.log(response)
        res.json(response);
    }
}