import { GlobalSettingsQuery } from "@/graphql/generated/graphql"
import Image from "next/image"

type FooterProps = {
    data: NonNullable<NonNullable<GlobalSettingsQuery["page"]>["generalSettingsFields"]>["branding"] | undefined
}
const Footer = ({ data }: FooterProps) => {
    return (
        <footer className="page-section items-endpb-4 pt-8 bg-gradient-to-br from-[#292929] via-[#202020] to-[#151515] text-white relative overflow-hidden">
            <div className="border-b border-gray-500 flex justify-between pb-4">
                <div>
                    <p className="text-eyebrow text-white/70 flex items-center with-accent-separator-right with-accent-separator-left mb-2">ace of wheel</p>
                    <p className="text-eyebrow text-white/50 flex items-center">Bike Repair In Amsterdam</p>
                </div>
                <div className="flex gap-5 items-end">
                    <div className="flex gap-3 items-center">
                        <div className="h-4">
                            <Image src="/images/icon-phone-orange.svg" alt="Phone Icon" width={24} height={24} className="block h-full w-auto" />
                        </div>
                        <p className="leading-0">7890-98899</p>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="h-4">
                            <Image src="/images/icon-email-orange.svg" alt="Email Icon" width={24} height={24} className="block h-full w-auto" />
                        </div>
                        <p className="leading-0">info@aceofwheels.nl</p>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <p className="text-sm text-white/65">Copyright © 2025 Ace of Wheels - Alle rechten voorbehouden</p>
            </div>{" "}
        </footer>
    )
}

export default Footer
