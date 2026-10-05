"use client"

import { LayoutGroup } from "motion/react"
import GalleryItem from "./GalleryItem/GalleryItem"
import GalleryMotionItem from "./GalleryMotionItem/GalleryMotionItem"

type GalleryInteractiveItem = {
    id: string
    src: string
    alt: string
    sizes: string
}

type Props = {
    items: GalleryInteractiveItem[]
}

const GalleryInteractive = ({ items }: Props) => {
    return (
        <LayoutGroup>
            <div className="main-container relative z-10">
                <div className="gallery-grid w-full">
                    {items.map((item) => (
                        <GalleryItem key={item.id} id={item.id} src={item.src} alt={item.alt} sizes={item.sizes} />
                    ))}
                </div>
            </div>
            <GalleryMotionItem />
        </LayoutGroup>
    )
}

export default GalleryInteractive
