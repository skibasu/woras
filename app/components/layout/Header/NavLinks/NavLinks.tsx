"use client"

import Link from "next/link"
import { menuScrollTo } from "@/app/helpers/menuScrollTo"

type Props = {
    className?: string
    onNavigate?: () => void
}

const links = [
    { label: "Home", href: "/", target: "home" },
    { label: "Features", href: "/#features", target: "features" },
    { label: "Reviews", href: "/#reviews", target: "reviews" },
    { label: "Gallery", href: "/#gallery", target: "gallery" },
    { label: "Pricing", href: "/#pricing", target: "pricing" },
] as const

const NavLinks = ({ className = "", onNavigate }: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        if (typeof window !== "undefined" && window.location.pathname === "/") {
            event.preventDefault()
            menuScrollTo(target)
        }

        onNavigate?.()
    }

    return (
        <>
            {links.map((link) => (
                <Link key={link.target} className={className} href={link.href} onClick={(event) => handleClick(event, link.target)}>
                    {link.label}
                </Link>
            ))}
        </>
    )
}

export default NavLinks
