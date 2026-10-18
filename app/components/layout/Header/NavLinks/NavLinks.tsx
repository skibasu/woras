"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { menuScrollTo } from "@/app/helpers/menuScrollTo"
import clsx from "clsx"
import { useMenuContext } from "@/app/context/MenuContext"
import { menuSettings } from "../helpers/menuSettngs"
import { motion } from "motion/react"

const NavLinks = () => {
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
        <ul className="md:flex items-center lg:gap-2 xl:gap-6 pr-6">
            {menuSettings.links.map((link) => (
                <li
                    key={link.target}
                    className="relative"
                >
                    <Link
                        className={clsx(
                            "block menu-link px-3 py-2",
                            activeSection === `#${link.target}` && "menu-link-active"
                        )}
                        href={link.href}
                        onClick={(event) => handleClick(event, link.target)}
                    >
                        {link.label}
                    </Link>
                    {activeSection === `#${link.target}` && (
                        <motion.div
                            className="absolute bottom-0 w-full bg-tetiary h-px"
                            layoutId="menu-underline"
                            id="menu-underline"
                        />
                    )}
                </li>
            ))}
        </ul>
    )
}

export default NavLinks
