import type { HomeQuery } from "@/graphql/generated/graphql"
import { getGoogleReviews } from "@/lib/google-reviews"
import RatingSummary from "./Rating/RatingSummary"
import ReviewsSlider from "./ReviewsSlider"
import StarsCounter from "./Rating/StarsCounter"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import Overlay from "../../ui/Overlay/Overlay"

type ReviewsData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["reviews"] | undefined

type Props = {
    data: ReviewsData
}
const Reviews = async ({ data }: Props) => {
    const reviews = await getGoogleReviews()

    return (
        <section
            className="page-section bg-image-cover relative section-y-spacing section-full-height "
            style={{
                backgroundImage: `url(${data?.backgroundImage?.node?.sourceUrl})`,
            }}
        >
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/60 to-black/80 w-full h-full top-0 left-0" />

            <div className="main-container relative z-10">
                <SectionTitle className="mb-10 lg:mb-16" textColor="light" title={data?.title} titleAccent={data?.titleAccent} accentEnd={data?.accentEnd} eyebrow={data?.eyebrow} subtitle={data?.subtitle} />
                <div className="flex flex-col items-center mb-12">
                    <RatingSummary rating={reviews?.rating || 0} reviewsCount={reviews?.userRatingCount || 0}>
                        <StarsCounter rating={reviews?.rating || 0} />
                    </RatingSummary>
                </div>

                <ReviewsSlider reviews={reviews?.reviews} />
            </div>
        </section>
    )
}

export default Reviews
