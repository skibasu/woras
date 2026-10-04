import { HomeQuery } from "@/graphql/generated/graphql"
import Link from "next/link"
import FeaturesCart from "./FeaturesCart"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"
import ButtonScrollTo from "../../ui/ButtonScrollTo/ButtonScrollTo"

type FeaturesData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["features"] | undefined

type FeaturesProps = {
    data: FeaturesData
}
const Features = ({ data }: FeaturesProps) => {
    return (
        <section id="features" className="page-section section-y-spacing relative overflow-hidden">
            <div className="main-container-sm relative z-30">
                <SectionTitle className="mb-10 lg:mb-16" title={data?.title} titleAccent={data?.titleAccent} accentEnd={data?.accentEnd} eyebrow={data?.eyebrow} subtitle={data?.subtitle} />
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-6">
                    {data?.items?.map((feature, i) => {
                        if (!feature) {
                            return null
                        }

                        return <FeaturesCart key={i} feature={feature} className={`${i === 2 ? "md:col-span-2 lg:col-span-1 md:max-w-1/2 m-auto lg:max-w-full lg:m-0" : ""}`} />
                    })}
                </div>
                <div className="flex justify-center mt-16">
                    <ButtonScrollTo className="btn btn-large btn-primary" target="contact" label={"Contact Us"} />
                </div>
            </div>
            <ProgressiveImage src="images/background-wheel-s.webp" alt="background" className=" w-full h-auto" width={1912} height={1274} containerClassName="absolute right-0 top-0 translate-x-2/3 translate-y-[-10%] z-0 w-[1912px] h-[1274px]" onLoadOpacity={0.07} />
        </section>
    )
}

export default Features
