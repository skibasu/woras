import EmblaCarousel from "../../../ui/Carousel/EmblaCarousel"
import PricingCart from "../PricingCart"

type Props = {
    items: PricingCategory[]
}

const PricingSlider = ({ items }: Props) => {
    return (
        <EmblaCarousel>
            {items?.map((item, index) => {
                return <PricingCart key={index} item={item} />
            })}
        </EmblaCarousel>
    )
}

export default PricingSlider
