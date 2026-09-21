import { PropsWithChildren } from "react"

const RatingSummary = ({ children }: PropsWithChildren) => {
    return <div className="inline-flex justify-center items-center rounded-full bg-black/40 pl-3 pr-4 py-3 shadow-lg backdrop-blur-sm">{children}</div>
}

export default RatingSummary
