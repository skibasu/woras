import { GoogleReview } from "@/lib/google-reviews"
import StarsCounter from "../Rating/StarsCounter"
import { TextExcerpt } from "../../../ui/TextExcerpt/TextExcerpt"
import { clsx } from "clsx"
import ProgressiveImage from "../../../ui/ProgressiveImage/ProgressiveImage"
import GoogleIcon from "@/app/components/ui/IconsSvg/GoogleIcon"

interface Props {
    data: GoogleReview | undefined
    className?: string
}
enum ReviewLimit {
    REVIEW_LIMIT = 260,
    REVIEW_MOBILE_LIMIT = 180,
}
const ReviewCart = ({ data, className }: Props) => {
    const reiewLimit = ReviewLimit.REVIEW_LIMIT

    const isFullReview = (length: number, limit: number = reiewLimit) => limit >= length
    return (
        <div className={clsx("flex flex-col h-full", className)}>
            <div className="cart py-8 px-6 flex flex-col h-full">
                <div className="mb-6 flex">
                    <ProgressiveImage
                        src={data?.authorAttribution?.photoUri || "/images/default-avatar.png"}
                        alt={data?.authorAttribution?.displayName || "Anonymous"}
                        width={70}
                        height={70}
                        className="block w-full h-full"
                        containerClassName="shrink-0 grow-0 h-16 w-16 lg:h-10 lg:w-10 xl:w-18 xl:h-18 rounded-full relative overflow-hidden"
                        loading="lazy"
                    />

                    <div className="shrink-0 grow-0 pl-3">
                        <p className="text-sm   text-left mb-2">
                            <span className="block text-black/90 font-semibold">
                                {data?.authorAttribution?.displayName || "Anonymous"}
                            </span>
                            <span className="block text-black/80">
                                {data?.publishTime
                                    ? new Date(data.publishTime).toLocaleDateString("en-GB", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                      })
                                    : ""}
                            </span>
                        </p>
                        <StarsCounter rating={data?.rating || 0} />
                    </div>
                </div>
                <div className="pb-6">
                    <p className="text-base leading-normal text-black/80">
                        <TextExcerpt
                            text={data?.text?.text || ""}
                            maxLength={ReviewLimit.REVIEW_LIMIT}
                            mobileMaxLength={ReviewLimit.REVIEW_MOBILE_LIMIT}
                        />
                    </p>
                </div>
                <div className="flex w-full items-center mt-auto pt-3 border-t border-gray-300">
                    <div className="p-1 border border-gray-300 rounded-full shrink-0 grow-0 w-10 h-10 flex justify-center items-center">
                        <GoogleIcon
                            className="block w-8 h-auto"
                            aria-label="Google Logo"
                            role="img"
                        />
                    </div>
                    <div className="pl-4 w-full text-reset">
                        <a
                            href={data?.googleMapsUri}
                            className={clsx(
                                "link",
                                isFullReview(data?.text?.text?.length || 0, ReviewLimit.REVIEW_LIMIT) && "link-disabled"
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read full review
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewCart
