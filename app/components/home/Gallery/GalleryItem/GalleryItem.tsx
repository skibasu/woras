"use client"

import ProgressiveImage from "@/app/components/ui/ProgressiveImage/ProgressiveImage"
import { useGalleryContext } from "@/app/context/GalleryContext"
import { motion } from "motion/react"

export type GalleryItemType = {
    id: string
    src: string
    alt: string
}

interface Props extends GalleryItemType {
    sizes: string
}

const GalleryItem = ({ id, src, alt, sizes }: Props) => {
    const { setSelected } = useGalleryContext()

    return (
        <motion.button layoutId={`gallery-${id}`} onClick={() => setSelected({ id, src, alt })} className="gallery-grid-item block cart">
            <ProgressiveImage src={src} alt={alt} fill sizes={sizes} className="object-cover absolute inset-0" containerClassName="w-full h-full absolute inset-0" loading="lazy" />
        </motion.button>
    )
}

export default GalleryItem
