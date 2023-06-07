import { Deta } from "deta";
const deta = Deta(process.env.DETA_BASE_KEY);
const db = deta.Base('submittedform');

export default db;