"use client"

import { HomeQuery } from "@/graphql/generated/graphql"
import { useMenuContext } from "@/app/context/MenuContext"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
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
            const img = new window.Image()

            img.onload = () => {
                console.log("[Gallery preload] SUCCESS", {
                    id: image.id,
                    src: image.src,
                    currentSrc: img.currentSrc,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                })

                setPreloadedImages((prev) => {
                    const next = new Set(prev)
                    next.add(image.id)
                    return next
                })

                resolve(image.id)
            }

            img.onerror = () => {
                console.error("[Gallery preload] FAILED", {
                    id: image.id,
                    src: image.src,
                    currentSrc: img.currentSrc,
                })

                reject(new Error(`Failed to load ${image.src}`))
            }

            img.src = image.src

            // Obsługa przypadku, gdy obraz jest już w cache.
            if (img.complete) {
                if (img.naturalWidth > 0) {
                    setPreloadedImages((prev) => {
                        if (prev.has(image.id)) return prev

                        const next = new Set(prev)
                        next.add(image.id)
                        return next
                    })

                    resolve(image.id)
                } else {
                    reject(new Error(`Failed to load ${image.src}`))
                }
            }
        })
    }

    useEffect(() => {
        console.log("[Gallery preload] PRELOADED IMAGES", [...preloadedImages])
    }, [preloadedImages])

    useEffect(() => {
        console.log("[Gallery preload] EFFECT", {
            activeSection,
            slidesCount: slides?.length,
        })

        if (activeSection !== "#gallery" || !slides) return

        let cancelled = false

        const preloadAllImages = async () => {
            const images: SelectedImage[] = slides.flatMap((slide) => {
                const node = slide?.image?.node

                if (!node?.id || !node.sourceUrl) return []

                return [
                    {
                        id: node.id,
                        src: node.sourceUrl,
                        alt: node.altText || "",
                        width: node.mediaDetails?.width || 1000,
                        height: node.mediaDetails?.height || 1000,
                    },
                ]
            })

            console.log("[Gallery preload] START", {
                count: images.length,
                images: images.map(({ id, src }) => ({ id, src })),
            })

            const results = await Promise.allSettled(images.map((image) => preloadImage(image)))

            console.log("[Gallery preload] FINISHED", {
                successful: results.filter((result) => result.status === "fulfilled").length,
                failed: results.filter((result) => result.status === "rejected").length,
            })

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
                    const isPreloaded = preloadedImages.has(node.id)

                    return (
                        <motion.button
                            key={node.id}
                            type="button"
                            className={clsx("gallery-grid-item cart bg-blue-300", cureentSlideId === node.id ? "z-2" : "z-1")}
                            layoutId={`gallery-${node.id}`}
                            onClick={() => {
                                if (!isPreloaded) return

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
                            <Image src={node.sourceUrl} alt={node.altText || ""} width={width} height={height} sizes={sizes} loading="lazy" className={clsx("object-cover w-full h-full hover:scale-105 transition-all duration-700", isPreloaded ? "grayscale-0 cursor-pointer" : "grayscale cursor-progress")} />
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
