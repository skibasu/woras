"use client"
import ProgressiveImage from "@/app/components/ui/ProgressiveImage/ProgressiveImage"
import { useGalleryContext } from "@/app/context/GalleryContext"
import { motion } from "motion/react"

export type GalleryItemType = {
    id: string
    src: string
    alt: string
    width?: number
    height?: number
}

interface Props extends GalleryItemType {
    sizes: string
}

const GalleryItem = ({ id, src, alt, sizes, width, height }: Props) => {
    const { setSelected } = useGalleryContext()

    return (
        <motion.button layoutId={`gallery-${id}`} onClick={() => setSelected({ id, src, alt, width, height })} className="gallery-grid-item block cart">
            <ProgressiveImage src={src} alt={alt} fill sizes={sizes} className="object-cover hover:scale-110 transition-transform duration-900" containerClassName="relative w-full h-full" loading="lazy" />
        </motion.button>
    )
}
export default GalleryItem
