"use client"

import type { HomeQuery } from "@/graphql/generated/graphql"
import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"

import FeaturesCart from "./FeaturesCart/FeaturesCart"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"
import ButtonScrollTo from "../../ui/ButtonScrollTo/ButtonScrollTo"
import { useBreakpoint } from "@/app/hooks/useBreakpoiint"

type FeaturesData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["features"] | undefined

type FeaturesProps = {
    data: FeaturesData
}

const Features = ({ data }: FeaturesProps) => {
    const { isDesktop, isDesktopXl, isDesktop2Xl, isReady } = useBreakpoint()
    const sectionRef = useRef<HTMLDivElement>(null)
    const [completed, setCompleted] = useState(false)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 100%", "end 90%"],
    })
    const containerScale = useTransform(scrollYProgress, [0.3, 0.5], [0.7, 1])
    const xLeft = useTransform(scrollYProgress, [0.6, 1], [200, 0])
    const xRight = useTransform(scrollYProgress, [0.6, 1], [-200, 0])
    const scaleCenter = useTransform(scrollYProgress, [0.6, 1], [1.1, 1])
    const scaleLeftRight = useTransform(scrollYProgress, [0.6, 1], [0.9, 1])
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest >= 1) setCompleted(false)
    })
    return (
        <section
            id="features"
            className="page-section section-y-spacing relative overflow-hidden"
        >
            <div className="main-container-sm relative z-30">
                <SectionTitle
                    className="mb-10 lg:mb-16"
                    title={data?.title}
                    titleAccent={data?.titleAccent}
                    accentEnd={data?.accentEnd}
                    eyebrow={data?.eyebrow}
                    subtitle={data?.subtitle}
                />
                {isReady && (
                    <div ref={sectionRef}>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-6"
                            style={isDesktop ? { scale: containerScale } : {}}
                        >
                            {data?.items?.map((feature, i) => {
                                if (!feature) return null

                                return (
                                    <FeaturesCart
                                        key={feature.image?.node?.id ?? feature.title ?? i}
                                        feature={feature}
                                        containerStyle={
                                            isDesktop || isDesktopXl || isDesktop2Xl
                                                ? i === 0
                                                    ? {
                                                          x: !completed ? xLeft : 0,
                                                          scale: !completed ? scaleLeftRight : 1,
                                                      }
                                                    : i === 1
                                                      ? { scale: !completed ? scaleCenter : 1 }
                                                      : {
                                                            x: !completed ? xRight : 0,
                                                            scale: !completed ? scaleLeftRight : 1,
                                                        }
                                                : {}
                                        }
                                        containerClassName={`
    ${i === 1 ? "order-1 md:order-1 md:col-span-2 lg:order-none lg:col-span-1" : "order-2 md:order-2 lg:order-none"}
    ${i === 2 ? "max-w-full" : ""}
    ${i === 1 ? "z-10" : "z-1"}
    shadow-xl cart py-9
`}
                                        //  containerClassName={`${
                                        //      i === 2
                                        //          ? "md:col-span-2 lg:col-span-1 md:max-w-1/2 m-auto lg:max-w-full lg:m-0"
                                        //          : ""
                                        //  } ${i === 1 ? "z-10" : "z-1"} shadow-xl cart py-9 order-1 md:order-0`}
                                        //containerStyle={{ scale: 1 }}
                                    />
                                )
                            })}
                        </motion.div>

                        <div className="flex justify-center mt-16">
                            <ButtonScrollTo
                                className="btn btn-large btn-primary"
                                target="contact"
                                label="Contact Us"
                            />
                        </div>
                    </div>
                )}
            </div>

            <ProgressiveImage
                src="images/background-wheel-s.webp"
                alt="background"
                fill
                className="object-cover"
                loading="eager"
                containerClassName="absolute right-0 top-0 translate-x-2/3 translate-y-[-10%] z-0 w-[1912px] h-[1274px]"
                onLoadOpacity={0.07}
            />
        </section>
    )
}

export default Features
