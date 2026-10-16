"use client"

import { motion } from "motion/react"
import type { Variants } from "motion/react"

import PricingCart from "./PricingCart"
import type { PricingQuery } from "@/graphql/generated/graphql"
import { useBreakpoint } from "@/app/hooks/useBreakpoiint"

type Props = {
    categories: NonNullable<NonNullable<NonNullable<NonNullable<PricingQuery["page"]>["pricingPage"]>["categories"]>>
}

const variantC: Variants = {
    hidden: { scale: 0.8, x: "-75%" },
    visible: {
        scale: 1,
        x: "0%",
        transition: { duration: 0.65, ease: "easeOut" },
    },
}

const variantB: Variants = {
    hidden: { scale: 0.7, x: "75%" },
    visible: {
        scale: 1,
        x: "0%",
        transition: { duration: 0.65, ease: "easeOut" },
    },
}

const variantA: Variants = {
    hidden: { scale: 0.6, x: "160%" },
    visible: {
        scale: 1,
        x: "0%",
        transition: { duration: 0.65, ease: "easeOut" },
    },
}

const variantD: Variants = {
    hidden: { scale: 0.9, x: "-160%" },
    visible: {
        scale: 1,
        x: "0%",
        transition: { duration: 0.65, ease: "easeOut" },
    },
}

const variantATablet: Variants = {
    hidden: { scale: 0.8, y: 50, opacity: 0, rotate: -10 },
    visible: {
        scale: 1,
        y: 0,
        opacity: 1,
        rotate: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
}

const variantBTablet: Variants = {
    hidden: { scale: 0.8, y: 50, opacity: 0, rotate: 10 },
    visible: {
        scale: 1,
        y: 0,
        opacity: 1,
        rotate: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
}
const variantArrTablet = [variantATablet, variantBTablet, variantATablet, variantBTablet]
const variantsArr = [variantA, variantB, variantC, variantD]

const PricingGrid = ({ categories }: Props) => {
    const { isDesktop2Xl, isTablet, isReady, isDesktop, isDesktopXl } = useBreakpoint()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 lg:gap-10 2xl:gap-6">
            {categories.map((item, i) => {
                if (!item) return null

                const props =
                    isDesktop2Xl && i
                        ? {
                              variants: variantsArr[i],
                              initial: "hidden" as const,
                              whileInView: "visible" as const,
                              viewport: { amount: 0.5, once: true },
                          }
                        : isTablet || isDesktop || isDesktopXl
                          ? {
                                initial: false,
                                animate: { scale: 1, x: 0 },
                            }
                          : {
                                initial: false,
                                animate: { scale: 1, x: 0 },
                            }
                return (
                    isReady && (
                        <motion.div
                            key={`${item.thumbnail?.node?.id}-${isDesktop2Xl ? "desktop2Xl" : isDesktopXl || isDesktop || isTablet ? "smallScreen" : "default"}`}
                            className="w-full h-full relative"
                            style={{ zIndex: i }}
                            {...props}
                        >
                            <PricingCart item={item} />
                        </motion.div>
                    )
                )
            })}
        </div>
    )
}

export default PricingGrid
