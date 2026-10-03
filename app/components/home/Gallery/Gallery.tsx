import type { HomeQuery } from "@/graphql/generated/graphql"
import Image from "next/image"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"

type GalleryData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["gallery"] | undefined

type Props = {
    data: GalleryData
}

const Gallery = ({ data }: Props) => {
    const slides = data?.slides?.filter((slide) => slide?.image?.node?.sourceUrl) ?? []

    if (slides.length === 0) {
        return null
    }

    return (
        <section id="gallery" className="page-section section-y-spacing bg-content bg-center bg-no-repeat relative  section-full-height overflow-hidden">
            <ProgressiveImage src="images/background-l-s.webp" alt="background" className="object-cover w-full h-full" fill={true} containerClassName="absolute inset-0 z-0 -translate-x-1/2 -translate-y-15 w-285 h-237.5" onLoadOpacity={0.08} />
            <SectionTitle className="mb-10 lg:mb-16" title={data?.title} titleAccent={data?.titleAccent} accentEnd={data?.accentEnd} eyebrow={data?.eyebrow} subtitle={data?.subtitle} />
            <div className="main-container relative z-10">
                <div className="gallery-grid w-full">
                    {slides.map((item, index) => {
                        const mobileFull = [0, 3, 6].includes(index)
                        const desktopHalf = index >= 3

                        const sizes = mobileFull ? (desktopHalf ? "(max-width: 767px) 100vw, 50vw" : "(max-width: 767px) 100vw, 33.33vw") : desktopHalf ? "50vw" : "(max-width: 767px) 50vw, 33.33vw"
                        return (
                            <a key={index} href={item?.image?.node?.sourceUrl || "#"} className="gallery-grid-item block cart" target="_blank" rel="noopener noreferrer">
                                <ProgressiveImage src={item?.image?.node?.sourceUrl || "/images/default-image.png"} alt={item?.image?.node?.altText || "Gallery Image"} fill sizes={sizes} className="object-cover w-full h-full absolute inset-0" containerClassName="w-full h-full absolute inset-0" loading="lazy" />
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Gallery
