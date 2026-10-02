import type { PricingQuery } from "@/graphql/generated/graphql"
import Image from "next/image"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"

type PricingCategory = NonNullable<NonNullable<NonNullable<NonNullable<PricingQuery["page"]>["pricingPage"]>["categories"]>[number]>

type Props = {
    item: PricingCategory
}

const PricingCart = ({ item }: Props) => {
    return (
        <div className="cart pb-25">
            <div className="h-24 w-full bg-image-cover relative opacity-70 border-b border-gray-300">
                <ProgressiveImage src={item?.thumbnail?.node?.sourceUrl ?? ""} alt={item?.thumbnail?.node?.altText ?? ""} className="w-full h-full object-cover" fill containerClassName="h-24 w-full relative border-b border-gray-300" onLoadOpacity={0.62} />
            </div>
            <div className="pt-6 px-4">
                <div className="mb-8">
                    <h3 className="text-black/80">{item?.categoryTitle ?? ""}</h3>
                    {item?.categoryDescription && <p>{item?.categoryDescription ?? ""}</p>}
                </div>
                <ul>
                    {item?.items?.map((subItem, j) => (
                        <li key={j} className="flex flex-col pb-4  mb-4">
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                                <h4 className="first-letter:uppercase text-black/80">{subItem?.itemTitle ?? ""}</h4>
                                {subItem?.price && <p className="shrink-0 grow-0 pl-5 font-semibold text-black/70">{`$${subItem.price}`}</p>}
                            </div>
                            <p className="first-letter:uppercase text-sm text-black/80">{subItem?.itemDescription ?? ""}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PricingCart
