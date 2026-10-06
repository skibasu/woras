import type { ComponentProps } from "react"
import Link from "next/link"
import clsx from "clsx"
import WhatsAppIcon from "./IconsSvg/WhatsAppIcon"

type Props = ComponentProps<typeof Link> & { iconWidth: number; iconHeight: number; label?: string | null }

const WhatsupMobileButton = ({ className = "", href = "#", iconWidth, iconHeight, label, ...props }: Props) => {
    return (
        <Link href={href} aria-label="Open WhatsApp" className={clsx("inline-flex p-2 items-center justify-center gap-2 rounded-full text-white text-sm font-semibold hover:bg-whatsapp-hover hover:shadow-sm hover:scale-110 transition-all", className)} {...props}>
            <WhatsAppIcon className="block" style={{ width: iconWidth, height: iconHeight }} aria-hidden="true" />
            {label && <span className="">{label}</span>}
        </Link>
    )
}

export default WhatsupMobileButton
