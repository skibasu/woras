import { GlobalSettingsQuery } from "@/graphql/generated/graphql"
import Link from "next/link"
import Image from "next/image"

type HeaderProps = {
    data: NonNullable<NonNullable<GlobalSettingsQuery["page"]>["generalSettingsFields"]>["branding"] | undefined
}
const Header = ({ data }: HeaderProps) => {
    console.log(data)
    return (
        <header className="w-full">
            <nav className="px-section py-4 flex justify-between items-center">
                <Link href="/">Home</Link>

                {data?.logo?.node?.sourceUrl && (
                    <div>
                        {" "}
                        <Image src={data?.logo?.node.sourceUrl} alt={data?.logo?.node.altText ?? "Logo"} width={100} height={100} />{" "}
                    </div>
                )}
                <Link href="/pricing">Pricing</Link>
            </nav>
        </header>
    )
}

export default Header
