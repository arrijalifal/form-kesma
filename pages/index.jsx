import Head from "next/head";
import Layout from "@/layout/layout";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import DataDiri, { capitalize, golonganUkt, listMatkul } from "@/lib/data";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home({ database }) {
    const data = database.data;
    const nama = database.data
    return (
        <Layout nama={database.nama} nrp={database.nrp}>
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
                                <div className="table-cell box-border w-auto h-5">{(dt === "matkul_mengulang") ? data.akademik[dt].map(mk => matkul[mk]).join(", ") : data.akademik[dt]}</div>
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
    const session = await getSession({ req });

    if (session) {
        const email = session.user.email;
        const isNRP = await axios({
            method: 'post',
            url: "http://localhost:3000/api/deta/checkNRP",
            data: {
                email: email
            }
        })
        if (isNRP.data.status) {
            return {
                redirect: {
                    destination: '/setNRP',
                    permanent: false
                }
            }
        } else {
            const file = await axios({
                method: 'post',
                url: "http://localhost:3000/api/deta/getData",
                data: {
                    email: email
                }
            });
            const database = file.data
            return {
                props: {
                    session,
                    database
                }
            }
        }
    }
    else {
        return {
            redirect: {
                destination: '/login',
                redirect: false
            }
        }
    }
}