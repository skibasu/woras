import { GoogleReview } from "@/lib/google-reviews"
import Image from "next/image"
import StarsCounter from "./StarsCounter"
import { TextExcerpt } from "../../ui/TextExcerpt"
import { clsx } from "clsx"

interface Props {
    data: GoogleReview | undefined
    className?: string
}
const ReviewCart = ({ data, className }: Props) => {
    return (
        <div className={clsx("px-6 flex flex-col h-full shadow", className)}>
            <div className="review-cart py-8 px-6 flex flex-col items-center bg-background h-full">
                <div className="rounded-full relative overflow-hidden flex flex-col items-center mb-6">
                    <Image src={data?.authorAttribution?.photoUri || "/images/default-avatar.png"} alt={data?.authorAttribution?.displayName || "Anonymous"} width={100} height={100} className="block" />
                </div>
                <StarsCounter rating={data?.rating || 0} />
                <p className="pt-6 text-column">
                    <TextExcerpt text={data?.text?.text || ""} maxLength={59} />
                </p>
                <div className="pb-4 w-full text-sm">
                    <a href={data?.googleMapsUri} className="link" target="_blank" rel="noopener noreferrer">
                        Read full review
                    </a>
                </div>
                <div className="flex w-full items-center mt-auto">
                    <div className="p-1 rounded-full border border-gray-300 bg-background">
                        <Image src="/images/google.svg" alt="Google Logo" width={20} height={20} className="block" />
                    </div>
                    <p className="text-sm pl-3 text-gray-500 text-left">
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
                </div>
            </div>
        </div>
    )
}

export default ReviewCart
