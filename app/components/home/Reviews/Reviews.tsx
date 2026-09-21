import type { HomeQuery } from "@/graphql/generated/graphql"
import { getGoogleReviews } from "@/lib/google-reviews"
import RatingSummary from "./RatingSummary"
import Image from "next/image"
import StarsCounter from "./StarsCounter"

type ReviewsData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["reviews"] | undefined

type ReviewsProps = {
    data: ReviewsData
}
const Reviews = async ({ data }: ReviewsProps) => {
    const reviews = await getGoogleReviews()
    console.log("reviews", reviews)
    return (
        <section
            className="py-14 min-h-175 bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${data?.backgroundImage?.node?.sourceUrl})`,
            }}
        >
            <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-transparent w-full h-full min-h-150 top-0 left-0" />
            <div className="max-w-5xl m-auto relative z-10">
                <h2 className="mb-6 text-center text-white">{data?.title}</h2>
                <div className="flex flex-col items-center">
                    <p className="mb-1 text-white text-center">{reviews?.displayName?.text}</p>
                    <RatingSummary>
                        <div className="text-white flex items-center">
                            <span className="block rounded-full relative overflow-hidden mr-4 bg-white p-2">
                                <Image src="/images/google.svg" alt="Google Logo" width={42} height={42} className="block" />
                            </span>
                            <span className="block text-number mr-8">{reviews?.rating?.toFixed(1)}</span>
                            <div>
                                <StarsCounter rating={reviews?.rating || 0} />
                                <span className="block text-sm">({reviews?.userRatingCount || 0}) Reviews</span>
                            </div>
                        </div>
                    </RatingSummary>
                </div>
            </div>
        </section>
    )
}

export default Reviews
