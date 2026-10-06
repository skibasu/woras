"use client"
import Link from "next/link"
import Image from "next/image"
import PhoneIcon from "@/app/components/ui/IconsSvg/PhoneIcon"
import EmailIcon from "@/app/components/ui/IconsSvg/EmailIcon"
import MapMarkerIcon from "@/app/components/ui/IconsSvg/MapMarkerIcon"
import CloseIcon from "@/app/components/ui/IconsSvg/CloseIcon"
import { useMenuContext } from "@/app/context/MenuContext"
import { menuScrollTo } from "@/app/helpers/menuScrollTo"

import clsx from "clsx"
import { menuSettings } from "../menuSettngs"
import ProgressiveImage from "@/app/components/ui/ProgressiveImage/ProgressiveImage"
import WhatsupMobileButton from "@/app/components/ui/WhatsupMobileButton"

interface Data {
    logoUrl: string | null
    logoAlt: string | null
    phone: string | null
    email: string | null
    city?: string | null
    whatsappButtonLabel: string | null
    phoneNumberDescription: string | null
    emailDescription: string | null
    cityDescription: string | null
}

interface Props {
    data: Data
}
const MobileMenu = ({ data }: Props) => {
    const { setIsMenuOpen, activeSection } = useMenuContext()
    const linksRest = menuSettings.links // Exclude #contact from the main links list

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        if (typeof window !== "undefined" && window.location.pathname === "/") {
            event.preventDefault()
            closeMenu()

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    menuScrollTo(target)
                })
            })

            return
        }

        closeMenu()
    }

    return (
        <div className="h-full pb-8">
            <div className="py-6 flex justify-between items-start px-5 relative z-1 border-b border-black/90">
                <Link href="/" className="block">
                    {data?.logoUrl ? <ProgressiveImage src={data?.logoUrl} alt={data.logoAlt || "Logo"} width={260} height={60} className="block h-13 w-auto" /> : <span className="text-white text-lg font-bold">Logo</span>}
                </Link>
                <button className="flex justify-center items-center w-5 h-5" aria-label="Close menu" onClick={closeMenu}>
                    <CloseIcon className="block text-accent w-full h-full" aria-hidden="true" />
                </button>
            </div>
            <nav className="relative z-1 pt-2">
                <ul className="flex flex-col px-3 gap-1">
                    {linksRest.map((link) => (
                        <li key={link.target}>
                            <Link className={clsx("mobile-menu-link", activeSection === `#${link.target}` && "mobile-menu-link-active")} href={link.href} onClick={(event) => handleLinkClick(event, link.target)}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="px-5 py-6">
                    <WhatsupMobileButton href="https://wa.me/1234567890" className="bg-primary px-4 w-full" iconWidth={20} iconHeight={20} label={data.whatsappButtonLabel || "WhatsApp"} />
                </div>

                <div className="space-y-6 mb-6 px-5 pt-5">
                    <div className="flex items-center gap-4">
                        <div className="w-4  shrink-0 grow-0">
                            <MapMarkerIcon className="block h-auto w-full text-accent" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white/90">{data.city || "Amsterdam"}</p>
                            <p className="text-sm text-white/70">{data.cityDescription}</p>
                        </div>
                    </div>

                    <a href={`tel:${data.phone}`} className="flex items-center gap-3">
                        <div className="h-5">
                            <PhoneIcon className="block h-full w-auto text-accent" aria-hidden="true" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-white/90">{data.phone}</p>
                            <p className="text-sm text-white/70">{data.phoneNumberDescription}</p>
                        </div>
                    </a>

                    <a href={`mailto:${data.email}`} className="flex items-center gap-4">
                        <div className="h-5">
                            <EmailIcon className="block h-full w-auto text-accent" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white/90">{data.email}</p>
                            <p className="text-sm text-white/80">{data.emailDescription}</p>
                        </div>
                    </a>
                </div>
            </nav>
            <div className="absolute h-40 w-60 bottom-0 right-0 translate-x-10 translate-y-8 overflow-hidden z-0">
                <Image src="/images/menu-background.webp" alt="Menu Background" fill className="inset-0 h-full w-full object-cover object-center opacity-20" />
            </div>
        </div>
    )
}

export default MobileMenu
