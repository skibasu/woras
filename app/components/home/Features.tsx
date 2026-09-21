import React from "react"
import { HomeQuery } from "@/graphql/generated/graphql"
import Image from "next/image"

type FeaturesData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["features"] | undefined

type FeaturesProps = {
    data: FeaturesData
}
const Features = ({ data }: FeaturesProps) => {
    return (
        <section className="py-24">
            <div className="container">
                <h2 className="mb-24 text-center">{data?.title}</h2>
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
                    {data?.items?.map((feature, i) => {
                        const className = i == 2 ? { className: "md:col-span-2 md:justify-self-center lg:col-span-1" } : {}
                        return (
                            <div key={i} {...className}>
                                <div className="px-4 py-4 text-center">
                                    <div className="relative aspect-square w-full overflow-hidden">
                                        <Image src={feature?.image?.node?.sourceUrl ?? ""} alt={feature?.image?.node?.altText ?? ""} fill className="object-cover" loading="lazy" />
                                    </div>
                                    <h3 className="mb-6 mt-8">{feature?.title}</h3>
                                    <p className="text-column">{feature?.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Features
