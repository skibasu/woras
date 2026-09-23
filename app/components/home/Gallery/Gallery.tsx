import type { HomeQuery } from "@/graphql/generated/graphql"
import Image from "next/image"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"

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
        <section
            className="bg-content bg-center bg-no-repeat relative section-y-spacing section-full-height"
            style={{
                backgroundImage: `url("/images/background-gallery.svg")`,
            }}
        >
            <SectionTitle className="mb-10 lg:mb-16" title={data?.title} titleAccent={data?.titleAccent} accentEnd={data?.accentEnd} eyebrow={data?.eyebrow} subtitle={data?.subtitle} />
            <div className="main-container">
                <div className="gallery-grid w-full">
                    {slides.map((item, index) => {
                        return (
                            <a key={index} href={item?.image?.node?.sourceUrl || "#"} className="gallery-grid-item block" target="_blank" rel="noopener noreferrer">
                                <Image src={item?.image?.node?.sourceUrl || "/images/default-image.png"} alt={item?.image?.node?.altText || "Gallery Image"} fill className="object-cover" />
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Gallery
