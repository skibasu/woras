import type { HomeQuery } from "@/graphql/generated/graphql"
import Image from "next/image"
import Link from "next/link"

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
            className="hero-section relative bg-cover bg-center bg-no-repeat flex flex-col md:justify-center min-h-dvh"
            style={{
                backgroundImage: `url(${data.backgroundImage?.node?.sourceUrl})`,
            }}
        >
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/70 to-black/50 w-full h-full min-h-150 top-0 left-0" />
            <div className="relative z-10 max-w-4xl pt-10 md:pt-0">
                <p className="text-eyebrow text-white/80 flex items-center with-accent-separator-left mb-2 lg:mb-6">{data.eyebrow}</p>
                <h1 className="text-slogan text-white shadow mb-4 max-w-180 xl:max-w-240">
                    {data.slogan}
                    {data.sloganAccent && <span className="text-accent">{` ${data.sloganAccent}`}</span>}
                    {data.sloganEnd && <span>{data.sloganEnd.length > 1 ? ` ${data.sloganEnd}` : data.sloganEnd}</span>}
                </h1>
                <p className="text-subtitle  text-white/70 mb-12">{data.subtitle}</p>

                <Link href="/contact" className="btn btn-primary btn-hero">
                    {data.buttonText}
                </Link>
                <ul className="flex gap-4 mt-16">
                    {data?.serviceList?.map((item, index) => (
                        <li key={index} className="flex flex-col md:flex-row items-center gap-2 md:gap-4 border-r border-white/20 pr-4 last:border-none">
                            <div className="grow-0 shrink-0 h-[22px] lg:h-[30px]">{item?.serviceIcon?.node?.sourceUrl && <Image className="w-auto h-full opacity-80" src={item?.serviceIcon?.node?.sourceUrl} alt={item?.serviceIcon?.node?.altText || ""} width={40} height={40} />}</div>
                            <p className="text-white/80 text-sm">{item?.serviceTitle}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="image-accent hidden lg:block absolute right-[64px] bottom-[100px] z-20">{data.accentImage?.node?.sourceUrl && <Image className="opacity-60" src={data.accentImage.node.sourceUrl} alt={data.accentImage.node.altText || ""} width={134} height={100} />}</div>
        </section>
    )
}
