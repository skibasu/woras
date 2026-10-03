"use client"

import type { EmblaOptionsType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { Children, PropsWithChildren, useEffect, useMemo, useState } from "react"

import EmblaCorouselDots from "./EmblaCorouselDots"
import ArrowIcon from "../IconsSvg/ArrowIcon"

const DEFAULT_OPTIONS: EmblaOptionsType = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
}

const getSlidesPerView = () => {
    if (typeof window === "undefined") return 1
    if (window.matchMedia("(min-width: 1280px)").matches) return 3
    if (window.matchMedia("(min-width: 768px)").matches) return 2
    return 1
}

const EmblaCarousel = ({ children }: PropsWithChildren) => {
    const autoplay = useMemo(
        () =>
            Autoplay({
                delay: 8000,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
            }),
        [],
    )

    const [emblaRef, emblaApi] = useEmblaCarousel(DEFAULT_OPTIONS, [autoplay])

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [snapCount, setSnapCount] = useState(0)
    const [slidesPerView, setSlidesPerView] = useState(1)
    const childrenArray = Children.toArray(children)

    const scrollPrev = () => emblaApi?.scrollPrev()
    const scrollNext = () => emblaApi?.scrollNext()
    const stopAutoplayOnDotsHover = () => emblaApi?.plugins().autoplay?.stop()
    const resumeAutoplayAfterDotsHover = () => emblaApi?.plugins().autoplay?.play()

    useEffect(() => {
        const onResize = () => setSlidesPerView(getSlidesPerView())

        onResize()
        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        const onUpdate = () => {
            const currentSnap = emblaApi.selectedScrollSnap()
            const pagesCount = Math.max(1, Math.ceil(childrenArray.length / slidesPerView))

            setSelectedIndex(Math.floor(currentSnap / slidesPerView))
            setSnapCount(pagesCount)
        }

        onUpdate()

        emblaApi.on("select", onUpdate)
        emblaApi.on("reInit", onUpdate)

        return () => {
            emblaApi.off("select", onUpdate)
            emblaApi.off("reInit", onUpdate)
        }
    }, [childrenArray.length, emblaApi, slidesPerView])

    return (
        <>
            <div className="embla relative">
                <button className="hidden lg:block embla__prev absolute top-[50%] lg:-left-15 hover:scale-120 cursor-pointer w-8.5 h-8.5 text-white rotate-180" onClick={scrollPrev} onMouseEnter={stopAutoplayOnDotsHover} onMouseLeave={resumeAutoplayAfterDotsHover}>
                    <ArrowIcon className="block w-full h-full" />
                </button>

                <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                    <div className="embla__container">
                        {childrenArray.map((child, index) => (
                            <div key={index} className="embla__slide">
                                {child}
                            </div>
                        ))}
                    </div>
                </div>

                <button className="hidden lg:block embla__next absolute top-[50%]  lg:-right-15 hover:scale-120 cursor-pointer text-white w-8.5 h-8.5" onClick={scrollNext} onMouseEnter={stopAutoplayOnDotsHover} onMouseLeave={resumeAutoplayAfterDotsHover}>
                    <ArrowIcon className="block w-full h-full" />
                </button>
            </div>

            <div className="mt-10">
                <EmblaCorouselDots count={snapCount} selectedIndex={selectedIndex} onClick={(index) => emblaApi?.scrollTo(index * slidesPerView)} onMouseEnter={stopAutoplayOnDotsHover} onMouseLeave={resumeAutoplayAfterDotsHover} />
            </div>
        </>
    )
}

export default EmblaCarousel
