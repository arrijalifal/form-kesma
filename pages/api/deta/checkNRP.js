import { Deta } from "deta";
const deta = Deta('c0dt59rqftu_pi6gLGrq7745kyzvdTRKi1QXToYvzwx1');
const db = deta.Base('submittedform');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;
        const isEmail = await db.get(email);
        if (isEmail && isEmail.nrp) {
            res.json({status: false})
        }
        else {
            res.json({status: true})
        }
    }
}