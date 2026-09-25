import { HomeQuery } from "@/graphql/generated/graphql"
import Image from "next/image"
import Link from "next/link"
import FeaturesCart from "./FeaturesCart"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"

type FeaturesData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["features"] | undefined

type FeaturesProps = {
    data: FeaturesData
}
const Features = ({ data }: FeaturesProps) => {
    return (
        <section className="section-y-spacing relative overflow-hidden">
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
                <div className="flex justify-center mt-10">
                    <Link href="/contact" className="btn btn-primary btn-hero">
                        Contact Us
                    </Link>
                </div>
            </div>
            <div className="lg:block absolute right-0 top-0 translate-x-2/3 translate-y-[-10%] z-0  w-[1912px] h-[1274px]">
                <Image className="opacity-7 w-full h-auto" src="images/background-wheel-s.webp" alt="" fill />
            </div>
        </section>
    )
}

export default Features
