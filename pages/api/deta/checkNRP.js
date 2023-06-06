import { Deta } from "deta";
const deta = Deta('c0dt59rqftu_pi6gLGrq7745kyzvdTRKi1QXToYvzwx1');
const db = deta.Base('submittedform');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        res.status(201).json(await db.put(req.body.nrp, req.body.email));
    }
}