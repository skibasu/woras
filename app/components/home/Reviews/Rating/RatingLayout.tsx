import { PropsWithChildren } from "react"

const RatingLayout = ({ children }: PropsWithChildren) => {
    return <div className="inline-flex justify-center items-center rounded-full bg-black/50 pl-3 pr-4 py-3 shadow-lg backdrop-blur-sm">{children}</div>
}

export default RatingLayout
