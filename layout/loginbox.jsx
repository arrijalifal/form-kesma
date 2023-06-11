import styles from '../styles/Login.module.css'

export default function LoginBox({children}) {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className={styles.box}>
                {children}
            </div>
        </div>
    )
}