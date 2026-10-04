import type { ComponentProps } from "react"
import Link from "next/link"
import clsx from "clsx"
import WhatsAppIcon from "./IconsSvg/WhatsAppIcon"

type Props = ComponentProps<typeof Link>

const WhatsupMobileButton = ({ className = "", href = "#", ...props }: Props) => {
    return (
        <Link href={href} aria-label="Open WhatsApp" className={clsx("inline-flex h-13 w-13 items-center justify-center rounded-full bg-whatsapp-hover text-white transition-colors hover:bg-whatsapp-hover", className)} {...props}>
            <WhatsAppIcon className="block h-8 w-8" aria-hidden="true" />
        </Link>
    )
}

export default WhatsupMobileButton
