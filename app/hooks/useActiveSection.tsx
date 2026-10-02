"use client"

import { useEffect, useState } from "react"

const useActiveSection = (ids: string[]) => {
    const [activeSection, setActiveSection] = useState("")
    const idsKey = ids.join("|")

    useEffect(() => {
        if (!document) return

        const currentIds = idsKey ? idsKey.split("|") : []

        const isMobile = window.matchMedia("(max-width: 767px)").matches
        const effectiveThreshold = isMobile ? 0.1 : 0.6

        const header = document.querySelector("#header")
        const headerHeight = header?.getBoundingClientRect().height ?? 0
        const elements = currentIds.map((id) => document.querySelector(id)).filter((el): el is Element => el !== null)

        if (!elements.length) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
                if (visibleSections.length) {
                    setActiveSection(`#${visibleSections[0].target.id}`)
                }
            },
            {
                threshold: effectiveThreshold,
                rootMargin: `-${headerHeight}px 0px 0px 0px`,
            },
        )

        elements.forEach((element) => observer.observe(element))

        return () => observer.disconnect()
    }, [idsKey])

    return activeSection
}

export default useActiveSection
