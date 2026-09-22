import type { HomeQuery } from "@/graphql/generated/graphql"
import Image from "next/image"

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
        <section className="py-24 flex flex-col items-center">
            <h2 className="text-center mb-24">Gallery</h2>
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
