import db from "@/lib/deta";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {email, nrp} = req.body;
        const hasil = await db.put({nrp: nrp}, email);
        res.json(hasil);
    }
}