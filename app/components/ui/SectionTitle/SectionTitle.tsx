import clsx from "clsx"

type TextTypes = string | null | undefined

interface Props {
    title: TextTypes
    titleAccent: TextTypes
    accentEnd: TextTypes
    eyebrow: TextTypes
    subtitle: TextTypes
    textColor?: "light" | "dark"
}
const SectionTitle = ({ title, titleAccent, accentEnd, eyebrow, subtitle, textColor = "dark" }: Props) => {
    const className = textColor === "light" ? "text-white/80" : "text-black/40"
    const classNameTitle = textColor === "light" ? "text-white" : "text-black"
    return (
        <div>
            {eyebrow && <p className={clsx("text-eyebrow text-black/40 flex justify-center items-center with-accent-separator-right with-accent-separator-left mb-2 lg:mb-4", className)}>{eyebrow}</p>}

            <h2 className={clsx("text-title text-center mb-3", classNameTitle)}>
                {title}
                {titleAccent && <span className="text-accent">{` ${titleAccent}`}</span>}
                {accentEnd && <span>{accentEnd.length > 1 ? ` ${accentEnd}` : accentEnd}</span>}
            </h2>
            {subtitle && <p className={clsx("text-subtitle-small text-center uppercase mb-10", className)}>{subtitle}</p>}
        </div>
    )
}

export default SectionTitle
