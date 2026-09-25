import type { TextareaHTMLAttributes } from "react"

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = ({ className = "", placeholder = "Describe your problem", ...props }: Props) => {
    return <textarea className={`h-[300px] w-full resize-none appearance-none border-0 border-b border-gray-300 bg-gray-100 px-4 py-3 text-base text-black shadow-none outline-none transition-colors placeholder:text-base placeholder:text-gray-600 hover:border-gray-300 focus:border-primary focus:outline-none focus:ring-0 active:border-primary ${className}`} placeholder={placeholder} {...props} />
}

export default Textarea
