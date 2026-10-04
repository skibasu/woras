import type { ComponentProps } from "react"
import Link from "next/link"
import clsx from "clsx"
import WhatsAppIcon from "./IconsSvg/WhatsAppIcon"
type Props = ComponentProps<typeof Link>

const WhatsupButton = ({ className = "", href = "#", ...props }: Props) => {
    return (
        <Link href={href} className={clsx("btn btn-whatsapp btn-whatsapp-primary", className)} {...props}>
            <div className="w-7 h-7 mr-4">
                <WhatsAppIcon className="block h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <span>Call Us On WhatsApp</span>
        </Link>
    )
}

export default WhatsupButton
