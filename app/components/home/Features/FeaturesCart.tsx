import { HomeQuery } from "@/graphql/generated/graphql"
import Image from "next/image"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"

type FeatureItem = NonNullable<NonNullable<NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["features"]>["items"]>[number]

type Props = {
    feature: FeatureItem
    className?: string
}

const FeaturesCart = ({ feature, className }: Props) => {
    return (
        <div className={className}>
            <div className="px-4 text-center">
                <ProgressiveImage src={feature?.image?.node?.sourceUrl ?? ""} alt={feature?.image?.node?.altText ?? ""} className="w-full h-full object-contain" width={200} height={200} containerClassName="relative w-full overflow-hidden flex justify-center h-50" onLoadOpacity={0.75} />

                <h3 className="mb-6 mt-8">{feature?.title}</h3>
                <p className="text-lg leading-[1.3]">{feature?.description}</p>
            </div>
        </div>
    )
}

export default FeaturesCart
