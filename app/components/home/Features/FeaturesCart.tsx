import { HomeQuery } from "@/graphql/generated/graphql"
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
                <ProgressiveImage
                    src={feature?.image?.node?.sourceUrl ?? ""}
                    alt={feature?.image?.node?.altText ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                    containerClassName="relative w-full overflow-hidden flex justify-center h-50"
                    onLoadOpacity={0.75}
                />

                <h3 className="mb-6 mt-8">{feature?.title}</h3>
                <p className="text-lg leading-[1.3]">{feature?.description}</p>
            </div>
        </div>
    )
}

export default FeaturesCart
