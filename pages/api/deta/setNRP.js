import db from "@/lib/deta";
export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        const { email, nrp } = req.body;
        let dbNRP = await db.get(email);
        if (!dbNRP) {
            const tempData = {
                data: {
                    "datadiri": {
                        "nrp": nrp,
                        "kontak": "",
                        "semester": ""
                    },
                    "ekonomi": {
                        "golongan_ukt": "golongan_0",
                        "pekerjaan_ayah": "",
                        "pendapatan_ayah": "",
                        "pekerjaan_ibu": "",
                        "pendapatan_ibu": ""
                    },
                    "akademik": {
                        "sks_tempuh": 0,
                        "sks_lulus": 0,
                        "matkul_mengulang": ["no"]
                    }
                },
                nrp: nrp
            }
            res.json(await db.put(tempData, email));
        }
        else {
            const hasil = await db.update({ nrp }, email);
            if (!dbNRP.data.datadiri.nrp) {
                db.update({ "data.datadiri.nrp": nrp }, email);
            }
            res.json(hasil);
        }
    }
}