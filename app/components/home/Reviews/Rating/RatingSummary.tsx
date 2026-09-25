import type { PropsWithChildren } from "react"
import Image from "next/image"

import RatingLayout from "./RatingLayout"

type Props = PropsWithChildren<{
    rating: number
    reviewsCount: number
}>

const RatingSummary = ({ rating, reviewsCount, children }: Props) => {
    return (
        <RatingLayout>
            <div className="text-white flex items-center">
                <span className="block rounded-full relative overflow-hidden mr-4 bg-white p-2 w-10 h-10">
                    <Image src="/images/google.svg" alt="Google Logo" width={42} height={42} className="block w-full h-full" />
                </span>
                <span className="block text-number mr-8">{rating.toFixed(1)}</span>
                <div>
                    {children}
                    <span className="block text-sm mt-1">({reviewsCount}) Reviews</span>
                </div>
            </div>
        </RatingLayout>
    )
}

export default RatingSummary
