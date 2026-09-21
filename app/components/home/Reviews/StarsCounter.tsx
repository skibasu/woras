import React from "react"
import Star, { FillType } from "./Star"
interface Props {
    rating: number
}
const StarsCounter = ({ rating }: Props) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => {
                const starRating = rating - index
                const fill: FillType = starRating >= 1 ? 100 : starRating >= 0.75 ? 75 : starRating >= 0.5 ? 50 : starRating >= 0.25 ? 25 : 0
                return <Star key={index} fill={fill} />
            })}
        </div>
    )
}

export default StarsCounter
