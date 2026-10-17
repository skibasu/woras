"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence } from "motion/react"
import LogoExtended from "../LogoExtended/LogoExtended"
import SplitTextToSpans from "../SplitTextToSpans/SplitTextToSpans"
import { motion } from "motion/react"

type TextValue = string | null | undefined
export type SlogansData = {
    slogan: TextValue
    sloganAccent: TextValue
    sloganEnd: TextValue
    subtitle: TextValue
}
type Props = {
    eyebrow: TextValue
    slogans: SlogansData[]
}

const AUTOPLAY_DELAY = 8000

const SectionSlogan = ({ eyebrow, slogans }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined

        const startAutoplay = () => {
            if (document.hidden) return

            clearAutoplay()

            interval = setInterval(() => {
                setActiveIndex((current) => (current + 1) % slogans.length)
            }, AUTOPLAY_DELAY)
        }

        const clearAutoplay = () => {
            if (interval !== undefined) {
                clearInterval(interval)
                interval = undefined
            }
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                clearAutoplay()
            } else {
                startAutoplay()
            }
        }

        startAutoplay()

        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            clearAutoplay()
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [])

    const currentSlogan = slogans[activeIndex]

    return (
        <div className="bg-cover bg-center bg-no-repeat">
            <LogoExtended
                companyName="ACE OF WHEELS"
                eyebrow={eyebrow ?? ""}
            />

            <h2 className="text-page-slogan text-white shadow mb-2 xl:mb-4 w-full max-w-150 md:max-w-170 xl:max-w-240">
                <AnimatePresence mode="wait">
                    <SplitTextToSpans
                        key={activeIndex}
                        text={currentSlogan.slogan || ""}
                        textAccented={currentSlogan.sloganAccent || ""}
                        textEnd={currentSlogan.sloganEnd || ""}
                        counter={counter}
                        setCounter={setCounter}
                    />
                </AnimatePresence>
            </h2>
            <motion.p
                key={activeIndex + (currentSlogan.subtitle || "")}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                    opacity: 1,
                    x: 16,
                    transition: { duration: 1, delay: counter === 0 ? 0 : 2 },
                }}
                exit={{ opacity: 0, x: 30, transition: { duration: 0.5 } }}
                className="text-subtitle text-white/70 mb-12"
            >
                {currentSlogan.subtitle}
            </motion.p>
        </div>
    )
}

export default SectionSlogan
