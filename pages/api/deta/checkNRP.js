import db from "@/lib/deta";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;
        const isEmail = await db.get(email);
        if (isEmail && isEmail.nrp) {
            res.json({status: true})
        }
        else {
            res.json({status: false})
        }
    }
}