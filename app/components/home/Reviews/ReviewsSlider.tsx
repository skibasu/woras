import type { GoogleReview } from "@/lib/google-reviews"

import EmblaCarousel from "../../ui/Carousel/EmblaCarousel"
import ReviewCart from "./ReviewCart"

type Props = {
    reviews: GoogleReview[] | undefined
}

const ReviewsSlider = ({ reviews }: Props) => {
    return (
        <EmblaCarousel>
            {reviews?.map((review, index) => {
                return <ReviewCart key={index} data={review} />
            })}
        </EmblaCarousel>
    )
}

export default ReviewsSlider
