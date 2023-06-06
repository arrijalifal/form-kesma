export default function LoginBox({children}) {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-1/3 bg-slate-50 rounded-lg pt-5 pb-2">
                {children}
            </div>
        </div>
    )
}