"use client"
import { createContext, Dispatch, useContext, useMemo, useState, type ReactNode } from "react"
import { GalleryItemType } from "../components/home/Gallery/GalleryItem/GalleryItem"

type GalleryContextValue = {
    selected: GalleryItemType | null
    setSelected: Dispatch<React.SetStateAction<GalleryItemType | null>>
}

type GalleryProviderProps = { children: ReactNode }

const GalleryContext = createContext<GalleryContextValue | null>(null)

export const GalleryContextProvider = ({ children }: GalleryProviderProps) => {
    const [selected, setSelected] = useState<GalleryItemType | null>(null)

    const value = useMemo(() => ({ selected, setSelected }), [selected])

    return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
}

export const useGalleryContext = () => {
    const context = useContext(GalleryContext)

    if (!context) {
        throw new Error("useGalleryContext must be used within GalleryContextProvider")
    }

    return context
}
