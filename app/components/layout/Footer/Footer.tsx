import EmailIcon from "@/app/components/ui/IconsSvg/EmailIcon"
import PhoneIcon from "@/app/components/ui/IconsSvg/PhoneIcon"
import { getGeneralSettings } from "@/lib/getGeneralSettings"
import Link from "next/link"

const Footer = async () => {
    const data = await getGeneralSettings()
    const { companyName, phoneNumber, companyEmail, copyrights, footerSubtitle } = data || {}
    return (
        <footer className="page-section items-endpb-4 pt-8 bg-linear-to-br from-[#292929] via-[#202020] to-[#151515] text-white relative overflow-hidden">
            <div className="border-b border-gray-500 flex flex-col items-center md:flex-row md:items-end justify-between pb-4 lg:pb-6">
                <div className="flex flex-col items-center md:block mb-8 md:mb-0">
                    <p className="text-brand-name text-white/70 with-accent-separator-right with-accent-separator-left mb-2 flex items-center">{companyName}</p>
                    <p className="text-brand-tagline text-center text-white/50">{footerSubtitle}</p>
                </div>
                <div className="flex gap-5 items-end">
                    <a href={`tel:${phoneNumber}`} className="flex gap-3 items-center block-link">
                        <div className="h-3">
                            <PhoneIcon className="block h-full w-auto text-accent/80 transition-transform" aria-hidden="true" />
                        </div>
                        <p className="leading-0 text-sm text-white/70 hover:text-white/90 transition-colors">{phoneNumber}</p>
                    </a>

                    <a href={`mailto:${companyEmail}`} className="flex gap-3 items-center block-link" aria-label="Email">
                        <div className="h-3">
                            <EmailIcon className="block h-full w-auto text-accent/80 transition-transform" aria-hidden="true" />
                        </div>
                        <p className="leading-0 text-sm  text-white/70 hover:text-white/90 transition-colors">{companyEmail}</p>
                    </a>
                </div>
            </div>
            <div className="py-4 flex flex-col md:flex-row items-center justify-between">
                <p className="text-[12px] text-center md:text-left text-white/65 order-2 md:order-0">{copyrights}</p>
                <Link href="/privacy-policy" className="text-[12px] text-white/70 hover:text-white/90 transition-colors mb-3 md:mb-0" aria-label="Privacy Policy">
                    Privacy Policy
                </Link>
            </div>
        </footer>
    )
}

export default Footer
