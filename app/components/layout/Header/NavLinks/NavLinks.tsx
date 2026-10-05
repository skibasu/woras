"use client"

import Link from "next/link"
import { menuScrollTo } from "@/app/helpers/menuScrollTo"
import clsx from "clsx"
import { useMenuContext } from "@/app/context/MenuContext"
import { menuSettings } from "../menuSettngs"

type Props = {
    className?: string
    onNavigate?: () => void
}

const NavLinks = ({ className = "", onNavigate }: Props) => {
    const { activeSection } = useMenuContext()

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        const sectionExists = typeof document !== "undefined" && document.querySelector(`#${target}`)

        if (sectionExists) {
            event.preventDefault()
            menuScrollTo(target)
        }

        onNavigate?.()
    }

    return (
        <>
            {menuSettings.links.map((link) => (
                <Link key={link.target} className={clsx(className, activeSection === `#${link.target}` && "menu-link-active")} href={link.href} onClick={(event) => handleClick(event, link.target)}>
                    {link.label}
                </Link>
            ))}
        </>
    )
}

export default NavLinks
