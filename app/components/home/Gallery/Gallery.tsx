import type { HomeQuery } from "@/graphql/generated/graphql"
import GalleryGrid from "./GalleryGrid/GalleryGrid"
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
                <GalleryGrid slides={slides} />
            </div>
        </section>
    )
}

export default Gallery
