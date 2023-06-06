import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
  async function handlerGoogleLogin() {
    
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <Head>
        <title>Login - From Kesma HIMATEKKOM ITS</title>
      </Head>
      <div className="w-1/3 bg-slate-50 rounded-lg pt-5 pb-2">
        <div className="text-center text-xl">
          <h1 className="w-4/5 mx-auto text-2xl select-none">Form KESMA HIMATEKKOM ITS</h1>
        </div>
        <div className="text-center mt-4">
          <button className="border-2 p-3 rounded-md hover:bg-blue-100" onSubmit={handlerGoogleLogin}>
            <Image src='/assets/google.svg' className="inline mr-2" width={20} height={20} /> Login dengan Google
          </button>
          <div className="w-full text-right">
            <span className="mr-2 px-[0.44rem] rounded-xl hover:bg-black hover:text-white select-none cursor-help">
              ?<span></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}