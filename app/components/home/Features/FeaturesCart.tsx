"use client"
import { HomeQuery } from "@/graphql/generated/graphql"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"
import { motion, Variants } from "motion/react"
import clsx from "clsx"

type FeatureItem = NonNullable<
    NonNullable<NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["features"]>["items"]
>[number]

type Props = {
    feature: FeatureItem
    containerClassName?: string
    className?: string
    style: React.CSSProperties
    variants?: Variants
}

const FeaturesCart = ({ feature, className, containerClassName, style, variants }: Props) => {
    return (
        <motion.div
            key={feature?.image?.node?.id || feature?.title}
            className={containerClassName}
            variants={variants}
            initial={"hidden"}
            // whileInView={"visible"}
            // viewport={{ amount: 0.5, once: false }}
        >
            <div
                className={clsx("px-4 text-center bg-white relative", className)}
                style={style}
            >
                <ProgressiveImage
                    src={feature?.image?.node?.sourceUrl ?? ""}
                    alt={feature?.image?.node?.altText ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                    containerClassName="relative w-full overflow-hidden flex justify-center h-50"
                    onLoadOpacity={0.75}
                />

                <h3 className="mb-6 mt-8">{feature?.title}</h3>
                <p className="text-lg leading-[1.3]">{feature?.description}</p>
            </div>
        </motion.div>
    )
}

export default FeaturesCart
