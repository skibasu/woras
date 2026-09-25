import type { ComponentProps } from "react"
import Link from "next/link"
import clsx from "clsx"
import Image from "next/image"
type Props = ComponentProps<typeof Link>

const WhatsupButton = ({ className = "", href = "#", ...props }: Props) => {
    return (
        <Link href={href} className={clsx("btn-whatsapp btn-wathsapp-primary", className)} {...props}>
            <div className="w-7 h-7 mr-4">
                <Image src="/images/whatsapp-icon.svg" alt="WhatsApp Icon" width={24} height={24} className="block w-full h-auto" />
            </div>
            <span>Call Us On WhatsApp</span>
        </Link>
    )
}

export default WhatsupButton
