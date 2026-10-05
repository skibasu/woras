import type { ComponentProps } from "react"
import Link from "next/link"
import clsx from "clsx"
import WhatsAppIcon from "./IconsSvg/WhatsAppIcon"
type Props = ComponentProps<typeof Link> & { label: string }

const WhatsupButton = ({ className, href = "#", label, ...props }: Props) => {
    return (
        <Link href={href} className={clsx("btn btn-whatsapp btn-wathsapp-primary", className)} {...props}>
            <div className="w-7 h-7 mr-4">
                <WhatsAppIcon className="block w-full h-auto" />
            </div>
            <span className="capitalize">{label}</span>
        </Link>
    )
}

export default WhatsupButton
