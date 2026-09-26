"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
const MenuContext = createContext<MenuContextValue | null>(null)

type MenuContextValue = {
    isMenuOpen: boolean
    setIsMenuOpen: (isOpen: boolean) => void
}

type MenuProviderProps = { children: ReactNode }

export const MenuContextProvider = ({ children }: MenuProviderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const value = useMemo(
        () => ({
            isMenuOpen,
            setIsMenuOpen,
        }),
        [isMenuOpen],
    )

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export const useMenuContext = () => {
    const context = useContext(MenuContext)

    if (!context) {
        throw new Error("useMenuContext must be used within MenuProvider")
    }

    return context
}
