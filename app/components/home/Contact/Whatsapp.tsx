import clsx from "clsx"
import WhatsupButton from "../../ui/WhatsupButton"

interface Props {
    eyebrow: string | null
    subtitle: string | null
    url: string | null
    className?: string
}
const WhatsApp = ({ eyebrow, subtitle, url, className }: Props) => {
    return (
        <div className={clsx("flex flex-col items-center", className)}>
            {eyebrow && <p className={clsx("text-eyebrow text-black/20 flex justify-center items-center with-small-accent-separator-left with-small-accent-separator-right mb-2 lg:mb-4", className)}>{eyebrow}</p>}

            <WhatsupButton href={url ?? "#"} className="mb-4 lg:mb-6" />
            {subtitle && <p className="text-subtitle-small text-center uppercase text-black/50">{subtitle}</p>}
        </div>
    )
}

export default WhatsApp
