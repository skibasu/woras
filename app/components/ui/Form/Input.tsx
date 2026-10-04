import clsx from "clsx"
import type { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & { isError?: boolean }

const Input = ({ className = "", placeholder = "Enter email or phone number", isError, ...props }: Props) => {
    return (
        <div className="relative">
            <input className={clsx("px-4 peer w-full appearance-none border-0 border-b border-gray-300 bg-gray-100 py-3 text-base text-black shadow-none outline-none transition-colors placeholder:text-base placeholder:text-gray-600 hover:border-gray-300 focus:border-primary focus:placeholder:text-transparent focus:outline-none focus:ring-0 active:border-primary", className, isError && "border-b border-red-600 bg-red-50")} placeholder={placeholder} {...props} />
            <span className={clsx("pointer-events-none absolute left-0 -top-5 text-sm opacity-0 translate-y-1 transition-all duration-200 peer-focus:opacity-100 peer-focus:translate-y-0")}>{placeholder}</span>
        </div>
    )
}

export default Input
