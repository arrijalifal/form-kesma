import { signOut } from "next-auth/react"
import styles from '../styles/Layout.module.css'

export default function Layout({ nama, nrp, children }) {
    return (
        <div className="relative">
            <header className={styles.login_info}>
                <div>
                    <p>{nama}</p>
                    <h3 className="font-semibold text-xl">{nrp}</h3>
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
            <main className={styles.body_content}>
                {children}
            </main>
        </div>
    )
}