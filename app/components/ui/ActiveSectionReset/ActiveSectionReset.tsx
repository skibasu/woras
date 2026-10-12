"use client"

import { useMenuContext } from "@/app/context/MenuContext"
import { useEffect } from "react"

const ActiveSectionReset = () => {
    const { setActiveSection } = useMenuContext()
    useEffect(() => {
        setActiveSection("")
        const target = sessionStorage.getItem("pendingHomeScrollTarget")
        if (target) {
            sessionStorage.removeItem("pendingHomeScrollTarget")
        }
    }, [setActiveSection])

    return null
}

export default ActiveSectionReset
