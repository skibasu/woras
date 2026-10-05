import type { HomeQuery } from "@/graphql/generated/graphql"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"
import GalleryInteractive from "./GalleryInteractive"

type GalleryData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["gallery"] | undefined

type Props = {
    data: GalleryData
}

const Gallery = ({ data }: Props) => {
    const slides = data?.slides?.filter((slide) => slide?.image?.node?.sourceUrl) ?? []
    const galleryItems = slides.map((item, index) => {
        const mobileFull = [0, 3, 6].includes(index)
        const desktopHalf = index >= 3
        const itemId = item?.image?.node?.id || `gallery-item-${index}`
        const sizes = mobileFull ? (desktopHalf ? "(max-width: 767px) 100vw, 50vw" : "(max-width: 767px) 100vw, 33.33vw") : desktopHalf ? "50vw" : "(max-width: 767px) 50vw, 33.33vw"

        return {
            id: itemId,
            src: item?.image?.node?.sourceUrl || "/images/default-image.png",
            alt: item?.image?.node?.altText || "Gallery Image",
            sizes,
        }
    })

    if (slides.length === 0) {
        return null
    }

    return (
        <section id="gallery" className="page-section section-y-spacing bg-content bg-center bg-no-repeat relative  section-full-height overflow-hidden">
            <ProgressiveImage src="images/background-l-s.webp" alt="background" className="object-cover w-full h-full" fill={true} containerClassName="absolute inset-0 z-0 -translate-x-1/2 -translate-y-15 w-285 h-237.5" onLoadOpacity={0.08} />
            <SectionTitle className="mb-10 lg:mb-16" title={data?.title} titleAccent={data?.titleAccent} accentEnd={data?.accentEnd} eyebrow={data?.eyebrow} subtitle={data?.subtitle} />
            <GalleryInteractive items={galleryItems} />
        </section>
    )
}

export default Gallery
