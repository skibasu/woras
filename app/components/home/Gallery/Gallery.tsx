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
        <section className="bg-content bg-center bg-no-repeat relative section-y-spacing section-full-height overflow-hidden">
            <div className="lg:block absolute -translate-x-4/6 translate-y-[-5%] left-0 top-0 z-0  w-[597px] h-[1187px]">
                <Image className="hidden opacity-12" src="images/background-tire-1.svg" alt="" fill />
            </div>
            <div className="lg:block absolute top-0 z-0 -translate-x-1/2 -translate-y-[60px] w-[1140px] h-[950px]">
                <Image className="opacity-8" src="images/background-l-s.webp" alt="" fill />
            </div>
            <SectionTitle className="mb-10 lg:mb-16" title={data?.title} titleAccent={data?.titleAccent} accentEnd={data?.accentEnd} eyebrow={data?.eyebrow} subtitle={data?.subtitle} />
            <div className="main-container relative z-10">
                <div className="gallery-grid w-full">
                    {slides.map((item, index) => {
                        return (
                            <a key={index} href={item?.image?.node?.sourceUrl || "#"} className="gallery-grid-item block cart" target="_blank" rel="noopener noreferrer">
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
