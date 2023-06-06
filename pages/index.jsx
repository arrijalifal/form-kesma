import Head from "next/head";
import Layout from "@/layout/layout";
import Link from "next/link";
import { getSession } from "next-auth/react";
import DataDiri, { capitalize, golonganUkt, listMatkul } from "@/lib/data";

export default function Home({ data }) {
    return (
        <Layout>
            <Head>
                <title>Form Kesejahteraan Mahasiswa HIMATEKKOM ITS</title>
            </Head>
            <ShowData database={data} />
        </Layout>
    )
}

function ShowData({ database }) {
    const data = database;
    const datadiri = Object.keys(data.datadiri);
    const ekonomi = Object.keys(data.ekonomi);
    const akademik = Object.keys(data.akademik);
    const matkul = listMatkul();
    return (
        <div>
            <h1 className="text-2xl mb-5">Review Data Anda</h1>
            <section className=" w-full">
                {
                    datadiri.map(dt => {
                        const keys = dt.split("_").map(k => (capitalize(k)) ? k.toUpperCase() : k.charAt(0).toUpperCase() + k.slice(1)).join(" ")
                        return (
                            <div key={dt} className="mb-1.5">
                                <div className="table-cell box-border w-48 h-5 font-medium">{(dt === 'nrp') ? keys.toUpperCase() : keys}</div>
                                <div className="table-cell box-border w-auto h-5 ">{data.datadiri[dt]}</div>
                            </div>
                        )
                    })
                }
            </section>
            <section className="w-full mt-5">
                {
                    ekonomi.map(dt => {
                        const keys = dt.split("_").map(k => (capitalize(k)) ? k.toUpperCase() : k.charAt(0).toUpperCase() + k.slice(1)).join(" ")
                        return (
                            <div key={dt} className="mb-1.5">
                                <div className="table-cell box-border w-48 h-5 font-medium">{keys}</div>
                                <div className="table-cell box-border w-auto h-5">{(dt.split("_")[0] === "pendapatan") ? golonganUkt(data.ekonomi[dt]) : data.ekonomi[dt]}</div>
                            </div>
                        )
                    })
                }
            </section>
            <section className="w-full mt-5">
                {
                    akademik.map(dt => {
                        const keys = dt.split("_").map(k => (capitalize(k)) ? k.toUpperCase() : k.charAt(0).toUpperCase() + k.slice(1)).join(" ")
                        return (
                            <div key={dt} className="mb-1.5">
                                <div className="table-cell box-border w-48 h-5 font-medium">{keys}</div>
                                <div className="table-cell box-border w-auto h-5">{(dt === "matkul_mengulang")? data.akademik[dt].map(mk => matkul[mk]).join(", ") : data.akademik[dt]}</div>
                            </div>
                        )
                    })
                }
            </section>
            <section className="text-center mt-10">
                <Link href={"/edit/" + data.datadiri.nrp}><button className="border-2 border-slate-50 bg-blue-600 text-gray-50 px-3 py-2 rounded-md">Edit Data</button></Link>
            </section>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    // const session = await getSession({req});
    // if(session) {
    //     return {
    //         props: { session }
    //     }
    // }
    // else {
    //     return {
    //         props: {}
    //     }
    // }
    const data = DataDiri();
    return {
        props: {
            data
        }
    }
}