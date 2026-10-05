"use client"
import React from "react"
import HamburgerIcon from "@/app/components/ui/IconsSvg/HamburgerIcon"
import { useMenuContext } from "@/app/context/MenuContext"

const Hamburger = () => {
    const { setIsMenuOpen } = useMenuContext()
    return (
        <button className="w-10 h-5 flex justify-center items-center md:hidden" aria-label="Open menu" onClick={() => setIsMenuOpen(true)}>
            <HamburgerIcon className="block h-full w-full text-white" aria-hidden="true" />
        </button>
    )
}

export default Hamburger
