import type { HomeQuery } from "@/graphql/generated/graphql"
import Image from "next/image"
import Link from "next/link"
import ServiceList from "./ServiceList"
import SectionSlogan from "../../ui/SectionSlogan/SectionSlogan"
import HeroPicture from "./HeroPicture"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"

type HeroData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["hero"] | undefined

type HeroProps = {
    data: HeroData
}

export const Hero = ({ data }: HeroProps) => {
    if (!data) {
        return null
    }

    return (
        <section id="home" className="hero-section section-hero-gradient relative bg-image-cover flex flex-col justify-center min-h-dvh">
            <HeroPicture src={data.backgroundImage?.node?.sourceUrl || ""} alt={data.backgroundImage?.node?.altText || ""} mobileUrl={data.mobileBackgroundImage?.node?.sourceUrl || ""} fetchPriority="high" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/70 to-black/50 w-full h-full min-h-150 top-0 left-0 z-0" />

            <div className="w-full">
                <div className="relative z-10 max-w-4xl pt-10 md:pt-0">
                    <SectionSlogan eyebrow={data.eyebrow} slogan={data.slogan} sloganAccent={data.sloganAccent} sloganEnd={data.sloganEnd} subtitle={data.subtitle} />

                    <Link href="/contact" className="btn btn-large btn-primary">
                        {data.buttonText}
                    </Link>
                    {data.serviceList && <ServiceList items={data.serviceList} />}
                </div>
                <ProgressiveImage src={data?.accentImage?.node.sourceUrl || ""} alt={data?.accentImage?.node.altText || ""} className="w-full h-auto" width={134} height={100} containerClassName="image-accent hidden lg:block absolute right-[64px] bottom-[100px] z-20" onLoadOpacity={0.25} />
            </div>
        </section>
    )
}
