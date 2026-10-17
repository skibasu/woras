"use client"

import type { HomeQuery } from "@/graphql/generated/graphql"
import { motion, type MotionStyle } from "motion/react"
import clsx from "clsx"
import ProgressiveImage from "../../../ui/ProgressiveImage/ProgressiveImage"

type FeatureItem = NonNullable<
    NonNullable<NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["features"]>["items"]
>[number]

type Props = {
    feature: FeatureItem
    containerClassName?: string
    className?: string

    containerStyle?: MotionStyle
}

const FeaturesCart = ({ feature, className, containerClassName, containerStyle }: Props) => {
    return (
        <motion.div
            className={containerClassName}
            style={containerStyle}
        >
            <div className={clsx("px-4 text-center bg-white relative", className)}>
                <ProgressiveImage
                    src={feature?.image?.node?.sourceUrl ?? ""}
                    alt={feature?.image?.node?.altText ?? ""}
                    width={feature?.image?.node?.mediaDetails?.width ?? 0}
                    height={feature?.image?.node?.mediaDetails?.height ?? 0}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-full w-auto"
                    containerClassName="w-full overflow-hidden flex justify-center h-18 md:h-30 lg:h-40"
                    onLoadOpacity={0.75}
                />

                <h3 className="mb-3 mt-3 md:mb-6 md:mt-8">{feature?.title}</h3>

                <p className="text-lg leading-[1.3]">{feature?.description}</p>
            </div>
        </motion.div>
    )
}

export default FeaturesCart
