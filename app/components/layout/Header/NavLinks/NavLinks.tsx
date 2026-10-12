"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { menuScrollTo } from "@/app/helpers/menuScrollTo"
import clsx from "clsx"
import { useMenuContext } from "@/app/context/MenuContext"
import { menuSettings } from "../menuSettngs"

type Props = {
    className?: string
}

const NavLinks = ({ className = "" }: Props) => {
    const { activeSection } = useMenuContext()
    const pathname = usePathname()
    const router = useRouter()

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        event.preventDefault()
        if (pathname === "/") {
            menuScrollTo(target)
        } else {
            sessionStorage.setItem("pendingHomeScrollTarget", target)
            router.push("/")
        }
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
