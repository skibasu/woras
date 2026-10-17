"use client"

import { motion } from "motion/react"
import type { PricingQuery } from "@/graphql/generated/graphql"

import PricingCart from "../PricingCart/PricingCart"
import { desktopVariants } from "../helpers/pricingVariants"

type Props = {
    categories: NonNullable<NonNullable<NonNullable<NonNullable<PricingQuery["page"]>["pricingPage"]>["categories"]>>
}

const PricingGridDesktop2Xl = ({ categories }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 lg:gap-10 2xl:gap-6">
            {categories.map((item, i) => {
                if (!item) return null

                return (
                    <motion.div
                        key={item.thumbnail?.node?.id ?? i}
                        className="relative h-full w-full"
                        style={{ zIndex: i }}
                        variants={desktopVariants[i % desktopVariants.length]}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.5, once: true }}
                    >
                        <PricingCart item={item} />
                    </motion.div>
                )
            })}
        </div>
    )
}

export default PricingGridDesktop2Xl
