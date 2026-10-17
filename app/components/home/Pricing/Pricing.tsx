import { PricingDocument } from "@/graphql/generated/graphql"
import { wordpressClient } from "@/lib/wpgraphql"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"

import HeroPicture from "../Hero/HeroPicture/HeroPicture"

import PricingGrid from "./PricingGrid/PricingGrid"

const Pricing = async () => {
    const data = await wordpressClient.request(PricingDocument)

    return (
        <section
            id="pricing"
            className="page-section section-y-spacing section-full-height bg-image-cover relative section-hero-gradient"
        >
            <HeroPicture
                src={data.page?.pricingPage?.heroImage?.node?.sourceUrl || ""}
                alt={data.page?.pricingPage?.heroImage?.node?.altText || ""}
                mobileUrl={data.page?.pricingPage?.mobileBackgroundImage?.node?.sourceUrl || ""}
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/20 w-full h-full top-0 left-0 z-0" />

            <div className="relative z-10 md:max-w-5xl 2xl:max-w-full m-auto">
                <SectionTitle
                    className="mb-10 lg:mb-16"
                    title={data?.page?.pricingPage?.title}
                    titleAccent={data?.page?.pricingPage?.titleAccent}
                    accentEnd={data?.page?.pricingPage?.accentEnd}
                    eyebrow={data?.page?.pricingPage?.eyebrow}
                    subtitle={data?.page?.pricingPage?.subtitle}
                    textColor="light"
                />

                <PricingGrid categories={data?.page?.pricingPage?.categories || []} />
            </div>
        </section>
    )
}

export default Pricing
