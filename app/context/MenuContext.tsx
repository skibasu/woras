"use client"
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { menuSettings } from "../components/layout/Header/helpers/menuSettngs"
const MenuContext = createContext<MenuContextValue | null>(null)

type MenuContextValue = {
    isMenuOpen: boolean
    setIsMenuOpen: (isOpen: boolean) => void
    activeSection: string
    setActiveSection: (section: string) => void
}

type MenuProviderProps = { children: ReactNode }

export const MenuContextProvider = ({ children }: MenuProviderProps) => {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("")

    const value = useMemo(
        () => ({
            isMenuOpen,
            setIsMenuOpen,
            activeSection,
            setActiveSection,
        }),
        [isMenuOpen, activeSection]
    )

    useEffect(() => {
        if (!document) return

        const currentIds = menuSettings.links.map((link) => `#${link.target}`)
        const isMobile = window.matchMedia("(max-width: 767px)").matches
        const effectiveThreshold = isMobile ? 0.3 : 0.5

        const header = document.querySelector("#header")
        const headerHeight = header?.getBoundingClientRect().height ?? 0
        const elements = currentIds.map((id) => document.querySelector(id)).filter((el): el is Element => el !== null)

        if (!elements.length) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
                if (visibleSections.length) {
                    setActiveSection(`#${visibleSections[0].target.id}`)
                }
            },
            {
                threshold: effectiveThreshold,
                rootMargin: `-${headerHeight}px 0px 0px 0px`,
            }
        )

        elements.forEach((element) => observer.observe(element))

        return () => observer.disconnect()
    }, [pathname])

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export const useMenuContext = () => {
    const context = useContext(MenuContext)

    if (!context) {
        throw new Error("useMenuContext must be used within MenuProvider")
    }

    return context
}
