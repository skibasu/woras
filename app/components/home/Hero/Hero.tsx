import type { HomeQuery } from "@/graphql/generated/graphql"
import Image from "next/image"
import Link from "next/link"
import ServiceList from "./ServiceList"
import SectionSlogan from "../../ui/SectionSlogan/SectionSlogan"

type HeroData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["hero"] | undefined

type HeroProps = {
    data: HeroData
}

export const Hero = ({ data }: HeroProps) => {
    if (!data) {
        return null
    }

    return (
        <section
            className="hero-section relative bg-image-cover flex flex-col md:justify-center min-h-dvh"
            style={{
                backgroundImage: `url(${data.backgroundImage?.node?.sourceUrl})`,
            }}
        >
            <div className="w-full">
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/70 to-black/50 w-full h-full min-h-150 top-0 left-0" />
                <div className="relative z-10 max-w-4xl pt-10 md:pt-0">
                    <SectionSlogan eyebrow={data.eyebrow} slogan={data.slogan} sloganAccent={data.sloganAccent} sloganEnd={data.sloganEnd} subtitle={data.subtitle} />

                    <Link href="/contact" className="btn btn-primary btn-hero">
                        {data.buttonText}
                    </Link>
                    {data.serviceList && <ServiceList items={data.serviceList} />}
                </div>
                <div className="image-accent hidden lg:block absolute right-[64px] bottom-[100px] z-20">{data.accentImage?.node?.sourceUrl && <Image className="opacity-60" src={data.accentImage.node.sourceUrl} alt={data.accentImage.node.altText || ""} width={134} height={100} />}</div>
            </div>
        </section>
    )
}
