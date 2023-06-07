import db from "@/lib/deta";
export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        const {email, nrp} = req.body;
        const hasil = await db.update({nrp}, email);
        const dbNRP = await db.get(email);
        if (!dbNRP.data.datadiri.nrp) {
            db.update({"data.datadiri.nrp": nrp}, email);
        }
        res.json(hasil);
    }
}