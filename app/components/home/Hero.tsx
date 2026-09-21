import type { HomeQuery } from "@/graphql/generated/graphql"
import Link from "next/link"

type HeroData = NonNullable<NonNullable<HomeQuery["page"]>["homePage"]>["hero"] | undefined

type HeroProps = {
    data: HeroData
}

export const Hero = ({ data }: HeroProps) => {
    if (!data) {
        return null
    }

    return (
        <section
            className="relative min-h-200 bg-cover bg-center bg-no-repeat flex flex-col justify-end items-center"
            style={{
                backgroundImage: `url(${data.backgroundImage?.node?.sourceUrl})`,
            }}
        >
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent w-full h-full min-h-150 top-0 left-0" />
            <div className="relative z-10 max-w-4xl pt-5 pb-20 flex flex-col items-center gap-5">
                <h1 className="text-center text-slogan">{data.slogan}</h1>

                <Link href="/contact" className="btn btn-primary">
                    {data.buttonText}
                </Link>
            </div>
        </section>
    )
}
