import type { ComponentProps } from "react"
import Link from "next/link"
import clsx from "clsx"
import WhatsAppIcon from "./IconsSvg/WhatsAppIcon"
type Props = ComponentProps<typeof Link>

const WhatsupButton = ({ className = "", href = "#", ...props }: Props) => {
    return (
        <Link href={href} className={clsx("btn btn-whatsapp btn-wathsapp-primary", className)} {...props}>
            <div className="w-7 h-7 mr-4">
                <WhatsAppIcon className="block w-full h-auto" />
            </div>
            <span className="capitalize">Call Us On WhatsApp</span>
        </Link>
    )
}

export default WhatsupButton
