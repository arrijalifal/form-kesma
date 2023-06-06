import Link from "next/link"
import { signOut } from "next-auth/react"

export default function Layout({ children }) {
    return (
        <div className="relative">
            <header className="bg-slate-50 flex justify-between mx-4 px-4 py-2 rounded-md sticky top-5">
                <div>
                    <p>Arrijal Istighfarotudzdzilal</p>
                    <h3 className="font-semibold text-xl">502XXXXXX9</h3>
                </div>
                <div className="my-auto">
                    <button
                        className="mx-auto p-2 bg-red-500 text-gray-100 rounded-md"
                        onClick={signOut}
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="w-1/2  bg-slate-50 mx-auto p-4 my-10 rounded-md">
                {children}
            </main>
        </div>
    )
}