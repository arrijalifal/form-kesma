export default function LoginBox({children}) {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-4/5 sm:w-2/3 md:w-3/5 lg:w-2/5 bg-slate-50 rounded-lg pt-5 pb-2">
                {children}
            </div>
        </div>
    )
}