import Link from "next/link"
import clsx from "clsx"
import WhatsAppIcon from "./IconsSvg/WhatsAppIcon"
import { getGeneralSettings } from "@/lib/getGeneralSettings"
type Props = { className?: string }

const WhatsAppButton = async ({ className = "" }: Props) => {
    const data = await getGeneralSettings()
    return (
        <Link className={clsx("btn btn-whatsapp btn-wathsapp-primary", className)} href={`https://wa.me/${data?.phoneNumber}`}>
            <div className="w-7 h-7 mr-4">
                <WhatsAppIcon className="block w-full h-auto" />
            </div>
            <span className="capitalize">{data?.whatsappButtonLabel}</span>
        </Link>
    )
}

export default WhatsAppButton
