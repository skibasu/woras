"use client"
import type { HomeQuery } from "@/graphql/generated/graphql"
import FeaturesCart from "./FeaturesCart"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"
import ButtonScrollTo from "../../ui/ButtonScrollTo/ButtonScrollTo"
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { useEffect, useRef } from "react"

type FeaturesData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["features"] | undefined

type FeaturesProps = {
    data: FeaturesData
}
const Features = ({ data }: FeaturesProps) => {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        container: sectionRef,
        offset: ["start end", "end end"],
    })
    //  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    //      console.log("Page scroll: ", latest)
    //  })

    return (
        <section
            ref={sectionRef}
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
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-6">
                    {data?.items?.map((feature, i) => {
                        const variants =
                            i != 1
                                ? {
                                      hidden: { x: i === 0 ? 200 : -200 },
                                      //   visible: {
                                      //       x: 0,

                                      //       transition: {
                                      //           duration: 0.35,
                                      //           ease: "easeIn",
                                      //           delay: 0.2,
                                      //       },
                                      //   },
                                  }
                                : {
                                      hidden: { scale: 1.1 },
                                      //   visible: {
                                      //       scale: 1,
                                      //       transition: {
                                      //           duration: 0.35,
                                      //           ease: "easeIn",
                                      //           delay: 0.1,
                                      //       },
                                      //   },
                                  }

                        if (!feature) {
                            return null
                        }

                        return (
                            <FeaturesCart
                                key={i}
                                feature={feature}
                                variants={variants}
                                style={
                                    i === 0
                                        ? { transform: `translateX(${200 * +scrollYProgress})` }
                                        : i === 2
                                          ? { transform: `translateX(${-200 * +scrollYProgress})` }
                                          : { scale: +`${1.2 - +scrollYProgress * 0.2}` }
                                }
                                containerClassName={`${i === 2 ? "md:col-span-2 lg:col-span-1 md:max-w-1/2 m-auto lg:max-w-full lg:m-0" : ""} ${i === 1 ? "z-10" : "z-1"} shadow-xl cart py-9`}
                            />
                        )
                    })}
                </div>
                <div className="flex justify-center mt-16">
                    <ButtonScrollTo
                        className="btn btn-large btn-primary"
                        target="contact"
                        label={"Contact Us"}
                    />
                </div>
                <motion.div
                    id="scroll-indicator"
                    style={{
                        scaleX: scrollYProgress,
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 10,
                        originX: 0,
                        width: "100%",

                        zIndex: 10000000000,
                        backgroundColor: "var(--hue-1)",
                    }}
                />
            </div>
            <ProgressiveImage
                src="images/background-wheel-s.webp"
                alt="background"
                fill={true}
                className="object-cover"
                loading="eager"
                containerClassName="absolute right-0 top-0 translate-x-2/3 translate-y-[-10%] z-0 w-[1912px] h-[1274px]"
                onLoadOpacity={0.07}
            />
        </section>
    )
}

export default Features
