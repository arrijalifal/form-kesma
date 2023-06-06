import LoginBox from "@/layout/loginbox";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function SetNRP() {
    const [nrp, setNrp] = useState('');
    const [isValid, setIsValid] = useState(false)
    useEffect(() => {
        if (nrp.length > 3) {
            if (nrp.slice(0, 4) === "5024") {
                setIsValid(true);
            }
            else setIsValid(false)
        }
        else setIsValid(true)
    })
    return (
        <LoginBox>
            <Head>
                <title>Assign your NRP</title>
            </Head>
            <div className="text-center text-xl">
                <h1 className="w-4/5 mx-auto text-2xl select-none">E-mail Belum Terdaftar</h1>
            </div>
            <div className="text-center mt-4">
                <p className="text-base">{(isValid)? 'Silakan masukkan NRP anda!' : 'Anda bukan Mahasiswa TEKKOM!'}</p>
                <input
                    type="text"
                    name="nrp"
                    id="nrp"
                    value={nrp}
                    onChange={e => setNrp(e.target.value)}
                    className="border border-gray-400 rounded-md outline-blue-400 p-1 mt-1 w-1/2"
                />
                <div>
                    <button className="border-2 px-3 py-1 mt-3 rounded-md hover:bg-blue-100">Masuk</button>
                </div>
            </div>
        </LoginBox>
    )
}