"use client"

import { useEffect } from "react"
import { menuScrollTo } from "@/app/helpers/menuScrollTo"
import { useMenuContext } from "@/app/context/MenuContext"

export default function PendingScroll() {
    const { setActiveSection } = useMenuContext()

    useEffect(() => {
        const target = sessionStorage.getItem("pendingHomeScrollTarget")
        setActiveSection("")
        sessionStorage.removeItem("pendingHomeScrollTarget")
        if (!target) return

        requestAnimationFrame(() => {
            if (document.getElementById(target)) {
                menuScrollTo(target)
            }
        })
    }, [setActiveSection])

    return null
}
