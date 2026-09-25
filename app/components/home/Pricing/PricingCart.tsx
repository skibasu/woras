import type { PricingQuery } from "@/graphql/generated/graphql"
import Image from "next/image"

type PricingCategory = NonNullable<NonNullable<NonNullable<NonNullable<PricingQuery["page"]>["pricingPage"]>["categories"]>[number]>

type Props = {
    item: PricingCategory
}

const PricingCart = ({ item }: Props) => {
    return (
        <div className="cart pb-25">
            <div className="h-24 w-full bg-image-cover relative opacity-70 border-b border-gray-300" style={{ backgroundImage: `url(${item?.thumbnail?.node?.sourceUrl})` }}>
                <div className="hidden w-12 h-12 rounded-full p-3 overflow-hidden border border-gray-300 absolute -bottom-4.5 left-1/2 -translate-x-1/2 items-center justify-center bg-gray-200 text-orange-700">
                    <Image src={item?.categoryIcon?.node?.sourceUrl ?? "/images/icon-3.svg"} alt={item?.thumbnail?.node?.altText ?? ""} width={24} height={24} className="block" />
                </div>
            </div>
            <div className="pt-6 px-4">
                {/* <div className="">
                    <h4 className="with-mini-accent-separator-right flex items-center text-primary">01</h4>
                </div> */}
                <div className="mb-8">
                    <h3 className="">{item?.categoryTitle ?? ""}</h3>
                    {item?.categoryDescription && <p>{item?.categoryDescription ?? ""}</p>}
                </div>
                <ul>
                    {item?.items?.map((subItem, j) => (
                        <li key={j} className="flex flex-col pb-4  mb-4">
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                                <h4 className="first-letter:uppercase ">{subItem?.itemTitle ?? ""}</h4>
                                {subItem?.price && <p className="shrink-0 grow-0 pl-5 font-semibold">{`$${subItem.price}`}</p>}
                            </div>
                            <p className="first-letter:uppercase text-sm">{subItem?.itemDescription ?? ""}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PricingCart
