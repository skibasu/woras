import { HomeQuery } from "@/graphql/generated/graphql"
import Image from "next/image"
import Link from "next/link"
import SectionTitle from "../ui/SectionTitle/SectionTitle"

type FeaturesData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["features"] | undefined

type FeaturesProps = {
    data: FeaturesData
}
const Features = ({ data }: FeaturesProps) => {
    return (
        <section className="section-y-spacing relative overflow-hidden">
            <div className="main-container-sm relative z-30">
                <SectionTitle title={data?.title} titleAccent={data?.titleAccent} accentEnd={data?.accentEnd} eyebrow={data?.eyebrow} subtitle={data?.subtitle} />
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
                    {data?.items?.map((feature, i) => {
                        const className = i == 2 ? { className: "md:col-span-2 md:justify-self-center lg:col-span-1" } : {}
                        return (
                            <div key={i} {...className}>
                                <div className="px-4 py-4 text-center">
                                    <div className="relative w-full overflow-hidden flex justify-center">
                                        <Image src={feature?.image?.node?.sourceUrl ?? ""} alt={feature?.image?.node?.altText ?? ""} width={400} height={400} className="h-[95px]" loading="lazy" />
                                    </div>
                                    <h3 className="mb-6 mt-8">{feature?.title}</h3>
                                    <p className="text-column">{feature?.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-center mt-10">
                    <Link href="/contact" className="btn btn-primary btn-hero">
                        Contact Us
                    </Link>
                </div>
            </div>
            <div className="lg:block absolute -right-[60px] -top-[60px]  z-0 translate-x-1/2 w-[630px] h-[630px]">
                <Image className="opacity-70" src="images/background-feature.svg" alt="" fill />
            </div>
            {data?.accentImage?.node?.sourceUrl && (
                <div className="hidden lg:block absolute left-[64px] top-[86px] z-20 ">
                    <Image className="opacity-60" src={data.accentImage.node.sourceUrl} alt={data.accentImage.node.altText || ""} width={134} height={100} />
                </div>
            )}
        </section>
    )
}

export default Features
