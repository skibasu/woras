import type { HomeQuery } from "@/graphql/generated/graphql"
import ServiceList from "./ServiceList"
import SectionSlogan from "../../ui/SectionSlogan/SectionSlogan"
import HeroPicture from "./HeroPicture"
import ButtonScrollTo from "../../ui/ButtonScrollTo/ButtonScrollTo"

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
                    <ButtonScrollTo className="btn btn-large btn-primary" target="contact" label={data.buttonText || "Contact Us"} />

                    {data.serviceList && <ServiceList items={data.serviceList} />}
                </div>
                {/* <div className="image-accent hidden lg:block absolute right-16 bottom-25 z-20">
                    <KeepRidingIcon className="w-full h-full" />
                </div> */}
            </div>
        </section>
    )
}
