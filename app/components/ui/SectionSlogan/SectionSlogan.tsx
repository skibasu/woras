type TextValue = string | null | undefined

type Props = {
    eyebrow: TextValue
    slogan: TextValue
    sloganAccent: TextValue
    sloganEnd: TextValue
    subtitle: TextValue
}

const SectionSlogan = ({ eyebrow, slogan, sloganAccent, sloganEnd, subtitle }: Props) => {
    return (
        <div className="bg-cover bg-center bg-no-repeat">
            <p className="text-eyebrow text-white/80 flex items-center with-accent-separator-left mb-2 lg:mb-6">{eyebrow}</p>
            <h1 className="text-page-slogan text-white shadow mb-4 max-w-180 xl:max-w-240">
                {slogan}
                {sloganAccent && <span className="text-accent">{` ${sloganAccent}`}</span>}
                {sloganEnd && <span>{sloganEnd.length > 1 ? ` ${sloganEnd}` : sloganEnd}</span>}
            </h1>
            <p className="text-subtitle text-white/70 mb-12">{subtitle}</p>
        </div>
    )
}

export default SectionSlogan
