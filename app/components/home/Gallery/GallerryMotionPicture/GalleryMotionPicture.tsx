"use client"
import CloseIcon from "@/app/components/ui/IconsSvg/CloseIcon"
import Portal from "@/app/components/ui/Portal/Portal"
import useScrollLock from "@/app/hooks/useScrollLock"
import { motion, Variants } from "motion/react"
import Image from "next/image"
import { useEffect } from "react"

const variants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,

        transition: {
            layout: {
                duration: 0.5,
                ease: "easeOut",
            },
            opacity: {
                duration: 0.2,
            },
        },
    },
    exit: {
        opacity: 0,
        transition: {
            layout: {
                duration: 0.5,
                ease: "easeIn",
            },
            opacity: {
                duration: 0.5,
            },
        },
    },
}
export const GalleryMotionPicture = ({ image: { src, alt, width, height }, layoutId, cb }: { layoutId: string; image: { src: string; alt: string; width: number; height: number }; cb?: () => void; selected?: boolean }) => {
    const { lockScroll, unLockScroll } = useScrollLock()
    useEffect(() => {
        lockScroll()
        return () => {
            unLockScroll()
        }
    }, [])
    return (
        <Portal>
            <motion.div
                key="overlay"
                className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.35 } }}
                exit={{
                    opacity: 0,
                    transition: {
                        duration: 0.25,
                    },
                }}
                onClick={cb}
            >
                <motion.div className="w-7 h-6.25 absolute top-8 right-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
                    <button type="button" className="flex justify-center items-center w-5 h-5 text-white" aria-label="Close Full View" onClick={cb}>
                        <CloseIcon className="block" aria-hidden="true" />
                    </button>
                </motion.div>
                <motion.article key="motion-article" variants={variants} layoutId={layoutId} initial="hidden" animate={"visible"} exit="exit" className="fixed left-1/2 top-1/2 z-100 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-black/20 max-h-[80vh]">
                    <div
                        className="shadow relative overflow-hidden rounded-2xl w-full h-full absolute  inset-0"
                        style={{
                            aspectRatio: `${width} / ${height}`,
                            width: `min(80vw, calc(80vh * ${width / height}))`,
                            height: `min(80vh, calc(80vw * ${height / width}))`,
                        }}
                    >
                        <Image src={src} alt={alt} priority fill sizes="80vw" className="block" />
                    </div>
                </motion.article>
            </motion.div>
        </Portal>
    )
}

export default GalleryMotionPicture
