import db from "@/lib/deta";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {email} = req.body
        const datapribadi = await db.get(email)
        res.json(datapribadi.data)
    }
}