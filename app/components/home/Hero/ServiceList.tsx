import type { HomeQuery } from "@/graphql/generated/graphql"
import Image from "next/image"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"

type ServiceListData = NonNullable<NonNullable<NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["hero"]>["serviceList"]>

type Props = {
    items: ServiceListData
}

const ServiceList = ({ items }: Props) => {
    return (
        <ul className="flex gap-4 mt-16">
            {items.map((item, index) => (
                <li key={index} className="flex flex-col md:flex-row items-center gap-2 md:gap-4 border-r border-white/20 pr-4 last:border-none">
                    <div className="grow-0 shrink-0 h-5.5 lg:h-7.5">{item?.serviceIcon?.node?.sourceUrl && <ProgressiveImage className="w-auto h-full" src={item?.serviceIcon?.node?.sourceUrl} alt={item?.serviceIcon?.node?.altText || ""} width={40} height={40} containerClassName="w-full h-full" onLoadOpacity={0.65} />}</div>
                    <p className="text-white/60 text-sm">{item?.serviceTitle}</p>
                </li>
            ))}
        </ul>
    )
}

export default ServiceList
