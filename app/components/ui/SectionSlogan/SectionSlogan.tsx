"use client"
import { useEffect, useState } from "react"
import LogoExtended from "../LogoExtended/LogoExtended"
import SplitTextToSpans from "../SplitTextToSpans/SplitTextToSpans"

type TextValue = string | null | undefined

type Props = {
    eyebrow: TextValue
    slogan: TextValue
    sloganAccent: TextValue
    sloganEnd: TextValue
    subtitle: TextValue
}
const slogans = [
    {
        slogan: "ARE YOU READY TO PULL YOUR",
        accent: "ACE",
        accentEnd: "?",
        subtitle: "Quick fix. 100% warranty.",
    },
    {
        slogan: "BACK ON THE ROAD.",
        accent: "FAST",
        accentEnd: ".",
        subtitle: "Fast service. No unnecessary waiting.",
    },
    {
        slogan: "YOUR",
        accent: "BIKE.",
        accentEnd: "OUR BUSINESS.",
        subtitle: "Careful repairs. Quality you can trust.",
    },
    {
        slogan: "DON'T JUST RIDE. RIDE",
        accent: "ACE",
        accentEnd: ".",
        subtitle: "Keep moving. We'll handle the rest.",
    },
]

const SectionSlogan = ({ eyebrow, slogan, sloganAccent, sloganEnd, subtitle }: Props) => {
    const [currentSlogan, setCurrentSlogan] = useState({ slogan, sloganAccent, sloganEnd })
    const { slogan: currentSloganText, sloganAccent: currentSloganAccent, sloganEnd: currentSloganEnd } = currentSlogan
    useEffect(() => {
        const interval = setInterval(() => {
            const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)]
            setCurrentSlogan({
                slogan: randomSlogan.slogan,
                sloganAccent: randomSlogan.accent,
                sloganEnd: randomSlogan.accentEnd,
            })
        }, 5000)
        return () => clearInterval(interval)
    }, [slogan, sloganAccent, sloganEnd])

    return (
        <div className="bg-cover bg-center bg-no-repeat">
            <LogoExtended
                companyName="ACE OF WHEELS"
                eyebrow={eyebrow ?? ""}
            />
            {/* <p className="text-eyebrow text-white/80 flex items-center with-accent-separator-left mb-2 lg:mb-6">{eyebrow}</p> */}
            <h2 className="text-page-slogan text-white shadow mb-4 max-w-180 xl:max-w-240">
                <SplitTextToSpans
                    key={currentSlogan + `${new Date().getTime()}`} // Add a unique key to force re-render
                    text={`${currentSloganText || ""}`}
                    textAccented={currentSloganAccent || ""}
                    textEnd={currentSloganEnd || ""}
                />
                {/* {slogan || ""}
                {sloganAccent && <span className="text-accent">{` ${sloganAccent}`}</span>}
                {sloganEnd && <span>{sloganEnd.length > 1 ? ` ${sloganEnd}` : sloganEnd}</span>} */}
            </h2>
            <p className="text-subtitle text-white/70 mb-12">{subtitle}</p>
        </div>
    )
}

export default SectionSlogan
