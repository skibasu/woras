import { GoogleReview } from "@/lib/google-reviews"
import Image from "next/image"
import StarsCounter from "./StarsCounter"

interface Props {
    data: GoogleReview | undefined
}
const ReviewCart = ({ data }: Props) => {
    return (
        <div className="review-cart bg-background py-8 px-6 flex flex-col items-center">
            <div className="rounded-full relative overflow-hidden flex flex-col items-center mb-6">
                <Image src={data?.authorAttribution?.photoUri || "/images/default-avatar.png"} alt={data?.authorAttribution?.displayName || "Anonymous"} width={100} height={100} className="block" />
            </div>
            <StarsCounter rating={data?.rating || 0} />
            <p className="text-md py-6">{data?.text?.text || ""}</p>
            <div className="flex">
                <Image src="/images/google.svg" alt="Google Logo" width={20} height={20} className="block" />
                <p className="text-xsm px-4 text-gray-800">
                    <strong>{data?.authorAttribution?.displayName || "Anonymous"}</strong> - {data?.publishTime || ""}
                </p>
            </div>
        </div>
    )
}

export default ReviewCart
