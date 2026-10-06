import Link from "next/link"
import clsx from "clsx"
import WhatsAppIcon from "./IconsSvg/WhatsAppIcon"

type Props = { iconWidth: number; iconHeight: number; label?: string | null; className?: string; phoneNumber: string | null }

const WhatsAppMobileButton = ({ className = "", iconWidth, iconHeight, label, phoneNumber }: Props) => {
    return (
        <Link aria-label="Open WhatsApp" className={clsx("inline-flex p-2 items-center justify-center gap-2 rounded-full text-white text-sm font-semibold hover:bg-whatsapp-hover hover:shadow-sm hover:scale-110 transition-all", className)} href={`https://wa.me/${phoneNumber}`}>
            <WhatsAppIcon className="block" style={{ width: iconWidth, height: iconHeight }} aria-hidden="true" />
            {label && <span className="">{label}</span>}
        </Link>
    )
}

export default WhatsAppMobileButton
