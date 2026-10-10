"use client"

import { HomeQuery } from "@/graphql/generated/graphql"
import { useMenuContext } from "@/app/context/MenuContext"
import { AnimatePresence, motion } from "motion/react"
import Image, { getImageProps } from "next/image"
import { useEffect, useState } from "react"
import GalleryMotionPicture from "../GallerryMotionPicture/GalleryMotionPicture"
import clsx from "clsx"

interface SelectedImage {
    src: string
    alt: string
    width: number
    height: number
    id: string
}

type Slides = NonNullable<NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["gallery"]>["slides"] | undefined

type Props = {
    slides: Slides
}

const GalleryGrid = ({ slides }: Props) => {
    const { activeSection } = useMenuContext()

    const [selected, setSelected] = useState<SelectedImage | null>(null)
    const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())
    const [cureentSlideId, setCurrentSlideId] = useState<string>("")

    const preloadImage = (image: SelectedImage): Promise<string> => {
        return new Promise((resolve, reject) => {
            const { props } = getImageProps({
                src: image.src,
                alt: image.alt,
                width: image.width,
                height: image.height,
                sizes: "80vw",
            })

            const img = new window.Image()

            img.onload = () => {
                setPreloadedImages((prev) => {
                    const next = new Set(prev)
                    next.add(image.id)
                    return next
                })

                resolve(image.id)
            }

            img.onerror = () => {
                reject(new Error(`Failed to load ${image.src}`))
            }

            img.srcset = props.srcSet || ""
            img.sizes = props.sizes || "80vw"
            img.src = props.src
        })
    }

    useEffect(() => {
        if (activeSection !== "#gallery" || !slides) return

        let cancelled = false

        const preloadAllImages = async () => {
            const images = slides
                .map((slide) => {
                    const node = slide?.image?.node

                    if (!node?.id || !node.sourceUrl) return null

                    return {
                        id: node.id,
                        src: node.sourceUrl,
                        alt: node.altText || "",
                        width: node.mediaDetails?.width || 1000,
                        height: node.mediaDetails?.height || 1000,
                    }
                })
                .filter((image) => image !== null)

            await Promise.allSettled(images.map((image) => preloadImage(image)))

            if (cancelled) return
        }

        void preloadAllImages()

        return () => {
            cancelled = true
        }
    }, [activeSection, slides])

    return (
        <>
            <div className="gallery-grid w-full relative z-10">
                {slides?.map((slide, index) => {
                    const node = slide?.image?.node

                    if (!node?.id || !node.sourceUrl) return null

                    const mobileFull = [0, 3, 6].includes(index)
                    const desktopHalf = index >= 3

                    const sizes = mobileFull ? (desktopHalf ? "(max-width: 767px) 100vw, 50vw" : "(max-width: 767px) 100vw, 33.33vw") : desktopHalf ? "50vw" : "(max-width: 767px) 50vw, 33.33vw"

                    const width = node.mediaDetails?.width || 1000
                    const height = node.mediaDetails?.height || 1000

                    return (
                        <motion.button
                            key={node.id}
                            type="button"
                            className={clsx("gallery-grid-item cart bg-blue-300", cureentSlideId === node.id ? "z-2" : "z-1")}
                            layoutId={`gallery-${node.id}`}
                            onClick={() => {
                                if (!preloadedImages.has(node.id)) return
                                setCurrentSlideId(node.id)
                                setSelected({
                                    id: node.id,
                                    src: node.sourceUrl || "",
                                    alt: node.altText || "",
                                    width,
                                    height,
                                })
                            }}
                        >
                            <Image src={node.sourceUrl} alt={node.altText || ""} width={width} height={height} sizes={sizes} loading="lazy" className={clsx("object-cover w-full h-full hover:scale-105 transition-all duration-700", preloadedImages.has(node.id) ? "grayscale-0 cursor-pointer" : "grayscale cursor-progress")} />
                        </motion.button>
                    )
                })}
            </div>

            <AnimatePresence>
                {selected && (
                    <GalleryMotionPicture
                        key="animated-image-key"
                        image={{
                            src: selected.src,
                            alt: selected.alt,
                            width: selected.width,
                            height: selected.height,
                        }}
                        layoutId={`gallery-${selected.id}`}
                        cb={() => setSelected(null)}
                        selected={selected.id === cureentSlideId}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default GalleryGrid
