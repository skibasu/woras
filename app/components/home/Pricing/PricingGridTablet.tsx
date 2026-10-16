"use client"

import { motion } from "motion/react"
import type { PricingQuery } from "@/graphql/generated/graphql"

import PricingCart from "./PricingCart"
import { tabletVariants } from "./pricingVariants"

type Props = {
    categories: NonNullable<NonNullable<NonNullable<NonNullable<PricingQuery["page"]>["pricingPage"]>["categories"]>>
}

const PricingGridTablet = ({ categories }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 lg:gap-10 2xl:gap-6">
            {categories.map((item, i) => {
                if (!item) return null

                return (
                    <motion.div
                        key={item.thumbnail?.node?.id ?? i}
                        className="relative h-full w-full"
                        style={{ zIndex: i }}
                        variants={tabletVariants[i % tabletVariants.length]}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3, once: true }}
                    >
                        <PricingCart item={item} />
                    </motion.div>
                )
            })}
        </div>
    )
}

export default PricingGridTablet
