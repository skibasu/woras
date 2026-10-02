"use client"

import Link from "next/link"
import { menuScrollTo } from "@/app/helpers/menuScrollTo"
import useActiveSection from "@/app/hooks/useActiveSection"
import clsx from "clsx"
import { links } from "../MobileMenu/menuLinks"
import { useMemo } from "react"

type Props = {
    className?: string
    onNavigate?: () => void
}

const NavLinks = ({ className = "", onNavigate }: Props) => {
    const linksMemo = useMemo(() => links, [])
    const sectionIds = useMemo(() => linksMemo.map((link) => `#${link.target}`), [linksMemo])
    const activeSection = useActiveSection(sectionIds)

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
                <Link key={link.target} className={clsx(className, activeSection === `#${link.target}` && "menu-link-active")} href={link.href} onClick={(event) => handleClick(event, link.target)}>
                    {link.label}
                </Link>
            ))}
        </>
    )
}

export default NavLinks
