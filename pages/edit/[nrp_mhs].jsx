import Layout from "@/layout/layout";
import Head from "next/head";
import DataDiri, { capitalize, golonganUkt, listMatkul } from "@/lib/data";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import HasAccess from "@/components/HasAccess";
import NoAccess from "@/components/NoAccess";
import React from "react";
import axios from "axios";

export default function EditData({ datafile }) {
  const router = useRouter();
  const isSameNRP = (router.query.nrp_mhs === datafile.nrp);
  const { data: session } = useSession();
  return (
    <Layout nama={datafile.nama} nrp={datafile.nrp}>
      <Head>
        <title>{(isSameNRP)? router.query.nrp_mhs : "Pencuri Data Orang"}</title>
      </Head>
      <HasAccess datafile={datafile} session={session}/>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    const getData = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/deta/getData',
      data: {
        email: session.user.email
      }
    });
    const datafile = getData.data
    return {
      props: {
        session,
        datafile
      }
    }
  }
  else {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
}