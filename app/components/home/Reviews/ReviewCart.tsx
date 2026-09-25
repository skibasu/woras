import { GoogleReview } from "@/lib/google-reviews"
import Image from "next/image"
import StarsCounter from "./Rating/StarsCounter"
import { TextExcerpt } from "../../ui/TextExcerpt"
import { clsx } from "clsx"

interface Props {
    data: GoogleReview | undefined
    className?: string
}
enum ReviewLimit {
    REVIEW_LIMIT = 320,
}
const ReviewCart = ({ data, className }: Props) => {
    const reiewLimit = ReviewLimit.REVIEW_LIMIT

    const isFullReview = (length: number, limit: number = reiewLimit) => limit >= length
    return (
        <div className={clsx("flex flex-col h-full", className)}>
            <div className="cart py-8 px-6 flex flex-col h-full">
                <div className="mb-6 flex">
                    <div className="shrink-0 grow-0 h-16 w-16 lg:h-10 lg:w-10 xl:w-18 xl:h-18 rounded-full relative overflow-hidden ">
                        <Image src={data?.authorAttribution?.photoUri || "/images/default-avatar.png"} alt={data?.authorAttribution?.displayName || "Anonymous"} width={70} height={70} className="block w-full h-full" />
                    </div>
                    <div className="shrink-0 grow-0 pl-3">
                        <p className="text-sm  text-gray-500 text-left mb-2">
                            <span className="block text-grey-500 font-semibold">{data?.authorAttribution?.displayName || "Anonymous"}</span>
                            <span className="block text-grey-300">
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
                    <p className="text-base leading-normal">
                        <TextExcerpt text={data?.text?.text || ""} maxLength={ReviewLimit.REVIEW_LIMIT} />
                    </p>
                </div>
                <div className="flex w-full items-center mt-auto pt-3 border-t border-gray-300">
                    <div className="p-1">
                        <Image src="/images/google-icon-s.svg" alt="Google Logo" width={43} height={39} className="block" />
                    </div>
                    <div className="pl-4 w-full text-reset">
                        <a href={data?.googleMapsUri} className={clsx("link", isFullReview(data?.text?.text?.length || 0, ReviewLimit.REVIEW_LIMIT) && "link-disabled")} target="_blank" rel="noopener noreferrer">
                            Read full review
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewCart
