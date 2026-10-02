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

interface Data {
    logoUrl: string | null
    logoAlt: string | null
    phone: string | null
    email: string | null
    city?: string | null
}

interface Props {
    data: Data
}
const MobileMenu = ({ data }: Props) => {
    const { setIsMenuOpen, activeSection } = useMenuContext()

    const linkContact = menuSettings.links.find((link) => link.target === "contact")
    const linksRest = menuSettings.links.filter((link) => link.target !== "contact") // Exclude #contact from the main links list

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
        <div className="mobile-menu-gradient h-full">
            <div className="py-4 flex justify-between items-start px-5 relative z-1">
                <Link href="/" className="block">
                    {data?.logoUrl ? <Image src={data?.logoUrl} alt={data.logoAlt || "Logo"} width={260} height={60} className="block h-13 w-auto" /> : <span className="text-white text-lg font-bold">Logo</span>}
                </Link>
                <button className="flex justify-center items-center w-7 h-6.25" aria-label="Close menu" onClick={closeMenu}>
                    <CloseIcon className="block text-current" aria-hidden="true" />
                </button>
            </div>
            <nav className="relative z-1">
                <ul>
                    {linksRest.map((link) => (
                        <li key={link.target} className={clsx(link.target !== "home" && "border-t border-gray-300")}>
                            <Link className={clsx("mobile-menu-link", activeSection === `#${link.target}` && "mobile-menu-link-active")} href={link.href} onClick={(event) => handleLinkClick(event, link.target)}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                {linkContact && (
                    <div className="px-5 py-6">
                        <Link href={linkContact.href} className="btn btn-small btn-primary w-full" onClick={(event) => handleLinkClick(event, linkContact.target)}>
                            {linkContact.label}
                        </Link>
                    </div>
                )}

                <div className="space-y-6 mb-6 px-5">
                    <div className="flex items-center gap-4">
                        <div className="w-4  shrink-0 grow-0 text-black/65">
                            <MapMarkerIcon className="block h-auto w-full text-current" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-black/65">{data.city || "Amsterdam"}</p>
                            <p className="text-sm text-black/50">Bicycle service and repairs</p>
                        </div>
                    </div>

                    <div className="">
                        <a href={`tel:${data.phone}`} className="flex items-center gap-3">
                            <div className="h-5 text-black/65">
                                <PhoneIcon className="block h-full w-auto text-current" aria-hidden="true" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-black/65">{data.phone}</p>
                                <p className="text-sm text-black/50">Call or WhatsApp</p>
                            </div>
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-5 text-black/65">
                            <EmailIcon className="block h-full w-auto text-current" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-black/65">{data.email}</p>
                            <p className="text-sm text-black/50">Get in touch with us</p>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="absolute h-40 w-60 bottom-0 right-0 translate-x-10 translate-y-8 overflow-hidden z-0">
                <Image src="/images/menu-background.webp" alt="Menu Background" fill className="inset-0 h-full w-full object-cover object-center opacity-20" />
            </div>
        </div>
    )
}

export default MobileMenu
