import type { HomeQuery } from "@/graphql/generated/graphql"
import { getGoogleReviews } from "@/lib/google-reviews"
import RatingSummary from "./RatingSummary"
import Image from "next/image"
import StarsCounter from "./StarsCounter"
import ReviewCart from "./ReviewCart"
import EmblaCarousel from "../../ui/Carousel/EmblaCarousel"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"

type ReviewsData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["reviews"] | undefined

type Props = {
    data: ReviewsData
}
const Reviews = async ({ data }: Props) => {
    const reviews = await getGoogleReviews()

    return (
        <section
            className="py-14 min-h-175 bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${data?.backgroundImage?.node?.sourceUrl})`,
            }}
        >
            <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-transparent w-full h-full min-h-150 top-0 left-0" />
            <div className="main-container-sm relative z-10 -mx-8 md:mx-0">
                <SectionTitle textColor="light" title={data?.title} titleAccent={data?.titleAccent} accentEnd={data?.accentEnd} eyebrow={data?.eyebrow} subtitle={data?.subtitle} />
                <div className="flex flex-col items-center mb-12">
                    {/* <p className="mb-1 text-white text-center text-h3">{reviews?.displayName?.text}</p> */}
                    <RatingSummary>
                        <div className="text-white flex items-center">
                            <span className="block rounded-full relative overflow-hidden mr-4 bg-white p-2">
                                <Image src="/images/google.svg" alt="Google Logo" width={42} height={42} className="block" />
                            </span>
                            <span className="block text-number mr-8">{reviews?.rating?.toFixed(1) || 0}</span>
                            <div>
                                <StarsCounter rating={reviews?.rating || 0} />
                                <span className="block text-sm">({reviews?.userRatingCount || 0}) Reviews</span>
                            </div>
                        </div>
                    </RatingSummary>
                </div>

                <EmblaCarousel
                    settings={{
                        options: {
                            loop: true,
                        },
                        slidesPerView: {
                            base: 1,
                            md: 2,
                            lg: 3,
                        },
                    }}
                >
                    {reviews?.reviews?.map((review, index) => {
                        return <ReviewCart key={index} data={review} />
                    })}
                </EmblaCarousel>
            </div>
        </section>
    )
}

export default Reviews
