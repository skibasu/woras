"use client"

import type { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { Children, PropsWithChildren, useEffect, useState } from "react"

import EmblaCorouselDots from "./EmblaCorouselDots"

const DEFAULT_OPTIONS: EmblaOptionsType = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
    },
}

const EmblaCarousel = ({ children }: PropsWithChildren) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(DEFAULT_OPTIONS)

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

    return (
        <>
            <div className="embla relative">
                <button className="hidden lg:block embla__prev absolute top-[50%] lg:-left-15 hover:scale-120 cursor-pointer" onClick={scrollPrev}>
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

                <button className="hidden lg:block embla__next absolute top-[50%]  lg:-right-15 hover:scale-120 cursor-pointer" onClick={scrollNext}>
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
