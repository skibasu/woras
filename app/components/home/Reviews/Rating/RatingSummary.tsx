import type { PropsWithChildren } from "react"
import RatingLayout from "./RatingLayout"
import GoogleIcon from "@/app/components/ui/IconsSvg/GoogleIcon"

type Props = PropsWithChildren<{
    rating: number
    reviewsCount: number
}>

const RatingSummary = ({ rating, reviewsCount, children }: Props) => {
    return (
        <RatingLayout>
            <div className="text-white flex items-center">
                <span className="rounded-full relative overflow-hidden mr-4 p-1 w-10 h-10 border border-gray-500 flex justify-center items-center bg-black">
                    <GoogleIcon className="block w-full h-auto" aria-label="Google Logo" role="img" />
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
