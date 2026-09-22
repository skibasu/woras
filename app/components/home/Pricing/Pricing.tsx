import { PricingDocument } from "@/graphql/generated/graphql"
import { wordpressClient } from "@/lib/wpgraphql"
import Image from "next/image"

const Pricing = async () => {
    const data = await wordpressClient.request(PricingDocument)

    return (
        <section
            className="py-14 min-h-175 bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${data?.page?.pricingPage?.heroImage?.node?.sourceUrl})`,
            }}
        >
            <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-transparent w-full h-full min-h-150 top-0 left-0" />

            <div className="main-container relative z-10">
                <h2 className="mb-24 text-center text-white">{data?.page?.pricingPage?.title ?? ""}</h2>
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.page?.pricingPage?.categories?.map((item, i) => (
                        <div key={i} className="cart">
                            <div className="h-24 w-full bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${item?.thumbnail?.node?.sourceUrl})` }}>
                                <div className="w-12 h-12 rounded-full p-3 overflow-hidden border border-gray-300 absolute -bottom-4.5 left-1/2 -translate-x-1/2 flex items-center justify-center bg-gray-200 text-orange-700">
                                    <Image src={item?.categoryIcon?.node?.sourceUrl ?? "/images/icon-3.svg"} alt={item?.thumbnail?.node?.altText ?? ""} width={24} height={24} className="block" />
                                </div>
                            </div>
                            <div className="pb-6 pt-10 px-4">
                                <div className="mb-6">
                                    <h3 className="text-center">{item?.categoryTitle ?? ""}</h3>
                                    {item?.categoryDescription && <p>{item?.categoryDescription ?? ""}</p>}
                                </div>
                                <ul>
                                    {item?.items?.map((subItem, j) => (
                                        <li key={j} className="flex flex-col pb-3 border-b border-gray-300 mb-3">
                                            <div className="flex justify-between">
                                                <h4 className="first-letter:uppercase">{subItem?.itemTitle ?? ""}</h4>
                                                <p className="shrink-0 grow-0 pl-5">{subItem?.price ?? 0}</p>
                                            </div>
                                            <p className="first-letter:uppercase text-reset">{subItem?.itemDescription ?? ""}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Pricing
