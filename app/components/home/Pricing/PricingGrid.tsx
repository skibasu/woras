"use client"

import type { PricingQuery } from "@/graphql/generated/graphql"
import { useBreakpoint } from "@/app/hooks/useBreakpoiint"
import PricingGridDesktop2Xl from "./PricingGridDesktop2Xl"
import PricingGridTablet from "./PricingGridTablet"
import PricingCart from "./PricingCart"

type Props = {
    categories: NonNullable<NonNullable<NonNullable<NonNullable<PricingQuery["page"]>["pricingPage"]>["categories"]>>
}

const PricingGrid = ({ categories }: Props) => {
    const { isDesktop2Xl, isTablet, isReady, isDesktopXl, isDesktop } = useBreakpoint()

    if (!isReady) return null

    if (isDesktop2Xl) {
        return (
            <PricingGridDesktop2Xl
                key="desktop-2xl"
                categories={categories}
            />
        )
    }

    if (isDesktopXl || isDesktop || isTablet) {
        return (
            <PricingGridTablet
                key="tablet-desktop"
                categories={categories}
            />
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {categories.map((item, i) => {
                if (!item) return null

                return (
                    <div
                        key={item.thumbnail?.node?.id ?? i}
                        className="w-full h-full"
                    >
                        <PricingCart item={item} />
                    </div>
                )
            })}
        </div>
    )
}

export default PricingGrid
