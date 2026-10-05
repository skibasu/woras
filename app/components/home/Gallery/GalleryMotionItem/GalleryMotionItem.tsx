"use client"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useGalleryContext } from "@/app/context/GalleryContext"
import CloseIcon from "@/app/components/ui/IconsSvg/CloseIcon"

const GalleryMotionItem = () => {
    const { selected, setSelected } = useGalleryContext()
    const { id, src, alt } = selected || { id: "", src: "", alt: "" }
    const [naturalSize, setNaturalSize] = useState({ width: 1200, height: 800 })

    useEffect(() => {
        if (!selected?.src) {
            return
        }

        let isMounted = true
        const image = new window.Image()

        image.src = selected.src
        image.onload = () => {
            if (!isMounted) {
                return
            }

            setNaturalSize({
                width: image.naturalWidth || 1200,
                height: image.naturalHeight || 800,
            })
        }

        return () => {
            isMounted = false
        }
    }, [selected?.src])

    return (
        <AnimatePresence>
            {selected !== null && (
                <>
                    <motion.div
                        className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setSelected(null)
                        }}
                    >
                        <motion.div className="w-7 h-6.25 absolute top-8 right-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <button className="flex justify-center items-center w-full h-full text-white" aria-label="Close Full View" onClick={() => setSelected(null)}>
                                <CloseIcon className="block" aria-hidden="true" />
                            </button>
                        </motion.div>
                    </motion.div>
                    <motion.article layoutId={`gallery-${id}`} className="fixed left-1/2 top-1/2 z-100 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl">
                        <Image src={src} alt={alt} width={naturalSize.width} height={naturalSize.height} className="block w-auto h-auto max-w-[92vw] max-h-[88dvh] object-contain" sizes="92vw" />
                    </motion.article>
                </>
            )}
        </AnimatePresence>
    )
}

export default GalleryMotionItem
