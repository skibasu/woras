"use client"

import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useGalleryContext } from "@/app/context/GalleryContext"
import CloseIcon from "@/app/components/ui/IconsSvg/CloseIcon"

const GalleryMotionItem = () => {
    const { selected, setSelected } = useGalleryContext()

    const { id, src, alt, width, height } = selected || {
        id: "",
        src: "",
        alt: "",
        width: 0,
        height: 0,
    }

    return (
        selected !== null && (
            <>
                <motion.div className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setSelected(null)}>
                    <motion.div className="w-7 h-6.25 absolute top-8 right-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
                        <button type="button" className="flex justify-center items-center w-5 h-5 text-white" aria-label="Close Full View" onClick={() => setSelected(null)}>
                            <CloseIcon className="block" aria-hidden="true" />
                        </button>
                    </motion.div>
                </motion.div>

                <motion.article
                    layoutId={`gallery-${id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        layout: {
                            duration: 0.45,
                            ease: "easeOut",
                        },
                        opacity: {
                            duration: 0.2,
                        },
                    }}
                    className="fixed left-1/2 top-1/2 z-100 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
                >
                    <Image src={src} alt={alt} width={width || 1200} height={height || 800} className="w-auto h-auto max-w-[85vw] max-h-[80dvh] " sizes="80vw" />
                </motion.article>
            </>
        )
    )
}

export default GalleryMotionItem
