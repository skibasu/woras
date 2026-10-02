import { PricingDocument } from "@/graphql/generated/graphql"
import { wordpressClient } from "@/lib/wpgraphql"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import PricingCart from "./PricingCart"

const Pricing = async () => {
    const data = await wordpressClient.request(PricingDocument)

    return (
        <section id="pricing" className="page-section section-y-spacing section-full-height bg-image-cover relative">
            <picture className="absolute inset-0 z-0 w-full h-full">
                <source media="(max-width: 767px)" srcSet={data?.page?.pricingPage?.mobileBackgroundImage?.node?.sourceUrl || data?.page?.pricingPage?.heroImage?.node?.sourceUrl || ""} />

                <img src={data?.page?.pricingPage?.heroImage?.node?.sourceUrl || ""} alt={data?.page?.pricingPage?.heroImage?.node?.altText || ""} className="h-full w-full object-cover" />
            </picture>
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/20 w-full h-full top-0 left-0 z-0" />

            <div className="relative z-10 md:max-w-5xl 2xl:max-w-full m-auto">
                <SectionTitle className="mb-10 lg:mb-16" title={data?.page?.pricingPage?.title} titleAccent={data?.page?.pricingPage?.titleAccent} accentEnd={data?.page?.pricingPage?.accentEnd} eyebrow={data?.page?.pricingPage?.eyebrow} subtitle={data?.page?.pricingPage?.subtitle} textColor="light" />

                <div className="grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-4 gap-6 lg:gap-10 2xl-gap-6">
                    {data.page?.pricingPage?.categories?.map((item, i) => {
                        if (!item) {
                            return null
                        }

                        return <PricingCart key={i} item={item} />
                    })}
                </div>
            </div>
        </section>
    )
}

export default Pricing
