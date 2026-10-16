"use client"

import { useLayoutEffect, useState } from "react"

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl"

const breakpoints: { name: Breakpoint; minWidth: number }[] = [
    { name: "2xl", minWidth: 1536 },
    { name: "xl", minWidth: 1280 },
    { name: "lg", minWidth: 1024 },
    { name: "md", minWidth: 768 },
    { name: "sm", minWidth: 640 },
]

export const useBreakpoint = () => {
    const [width, setWidth] = useState<number | null>(null)

    useLayoutEffect(() => {
        const updateWidth = () => setWidth(window.innerWidth)

        updateWidth()
        window.addEventListener("resize", updateWidth)

        return () => window.removeEventListener("resize", updateWidth)
    }, [])

    const breakpoint = width === null ? null : (breakpoints.find((bp) => width >= bp.minWidth)?.name ?? "base")

    return {
        breakpoint,
        isMobile: width !== null && width < 768,
        isTablet: width !== null && width >= 768 && width < 1024,
        isDesktop: width !== null && width >= 1024 && width < 1280,
        isDesktopXl: width !== null && width >= 1280 && width < 1536,
        isDesktop2Xl: width !== null && width >= 1536,
        isReady: width !== null,
    }
}
