"use client"

import type { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { Children, PropsWithChildren, useEffect, useMemo, useState } from "react"

import EmblaCorouselDots from "./EmblaCorouselDots"

type SlidesPerView = {
    base: number
    md: number
    lg: number
}

type SlideSize = {
    base: string
    md?: string
    lg?: string
}

type CarouselSettings = {
    options?: EmblaOptionsType
    slidesPerView?: SlidesPerView
    slideSize?: SlideSize
}

type Props = PropsWithChildren<{
    settings?: CarouselSettings
}>

const DEFAULT_SLIDES_PER_VIEW: SlidesPerView = {
    base: 1,
    md: 2,
    lg: 3,
}

const DEFAULT_OPTIONS: EmblaOptionsType = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
    },
}

const EmblaCarousel = ({ children, settings }: Props) => {
    const slidesPerView = settings?.slidesPerView ?? DEFAULT_SLIDES_PER_VIEW
    const computedSlideSize: SlideSize = settings?.slideSize ?? {
        base: `${100 / slidesPerView.base}%`,
        md: `${100 / slidesPerView.md}%`,
        lg: `${100 / slidesPerView.lg}%`,
    }

    const options = useMemo(() => {
        return {
            ...DEFAULT_OPTIONS,
            ...settings?.options,
            breakpoints: {
                ...DEFAULT_OPTIONS.breakpoints,
                ...settings?.options?.breakpoints,
            },
        } satisfies EmblaOptionsType
    }, [settings?.options])

    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [snapCount, setSnapCount] = useState(0)
    const childrenArray = Children.toArray(children)

    const scrollPrev = () => emblaApi?.scrollPrev()
    const scrollNext = () => emblaApi?.scrollNext()

    useEffect(() => {
        if (!emblaApi) return

        const onUpdate = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
            setSnapCount(emblaApi.scrollSnapList().length)
        }

        onUpdate()

        emblaApi.on("select", onUpdate)
        emblaApi.on("reInit", onUpdate)

        return () => {
            emblaApi.off("select", onUpdate)
            emblaApi.off("reInit", onUpdate)
        }
    }, [emblaApi])

    const sliderStyle = {
        "--embla-slide-size": computedSlideSize.base,
        "--embla-slide-size-md": computedSlideSize.md ?? computedSlideSize.base,
        "--embla-slide-size-lg": computedSlideSize.lg ?? computedSlideSize.md ?? computedSlideSize.base,
    } as React.CSSProperties

    return (
        <>
            <div className="embla relative" style={sliderStyle}>
                <button className="hidden lg:block embla__prev absolute top-[50%] -left-6 xl:-left-15 hover:scale-110 cursor-pointer" onClick={scrollPrev}>
                    <Image src="/images/arrow.svg" alt="previous" width={24} height={24} className="block rotate-180" />
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

                <button className="hidden lg:block embla__next absolute top-[50%] -right-6 xl:-right-15 hover:scale-110 cursor-pointer" onClick={scrollNext}>
                    <Image src="/images/arrow.svg" alt="next" width={24} height={24} className="block" />
                </button>
            </div>

            <div className="mt-10">
                <EmblaCorouselDots count={snapCount} selectedIndex={selectedIndex} onClick={(index) => emblaApi?.scrollTo(index)} />
            </div>
        </>
    )
}

export default EmblaCarousel
