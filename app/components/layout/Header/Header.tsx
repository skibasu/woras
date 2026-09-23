import { GlobalSettingsQuery } from "@/graphql/generated/graphql"
import Link from "next/link"
import Image from "next/image"

type HeaderProps = {
    data: NonNullable<NonNullable<GlobalSettingsQuery["page"]>["generalSettingsFields"]>["branding"] | undefined
}
const Header = ({ data }: HeaderProps) => {
    return (
        <header className="header">
            <div className="page-section py-2 flex justify-between items-center">
                <Link href="/">{data?.logo?.node?.sourceUrl ? <Image src={data.logo.node.sourceUrl} alt={data.logo.node.altText || "Logo"} width={200} height={50} className="h-[50px] w-auto" /> : <span className="text-white text-lg font-bold">Logo</span>}</Link>
                <nav className="hidden md:flex gap-5 items-center">
                    <Link className="menu-link p-2" href="/">
                        Home
                    </Link>
                    <Link className="menu-link p-2" href="/#features">
                        Features
                    </Link>
                    <Link className="menu-link p-2" href="/#reviews">
                        Reviews
                    </Link>
                    <Link className="menu-link p-2" href="/#gallery">
                        Gallery
                    </Link>
                    <Link className="menu-link p-2" href="/#pricing">
                        Pricing
                    </Link>
                    <Link href="/contact" className="btn btn-primary btn-sm ml-3">
                        Contact Us
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header
