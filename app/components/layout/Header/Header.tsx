import { GlobalSettingsQuery } from "@/graphql/generated/graphql"
import Link from "next/link"
import Image from "next/image"
import PhoneIcon from "../../ui/IconsSvg/PhoneIcon"
import Hamburger from "./Hamburger/Hamburger"
import MenuModal from "./MenuModal/MenuModal"
import NavLinks from "./NavLinks/NavLinks"

type HeaderProps = {
    data: NonNullable<NonNullable<GlobalSettingsQuery["page"]>["generalSettingsFields"]>["branding"] | undefined
}
const Header = ({ data }: HeaderProps) => {
    return (
        <header id="header" className="header w-full flex items-center">
            <div className="page-section py-2 flex justify-between items-center">
                <Link href="/" className="block">
                    {data?.logo?.node?.sourceUrl ? <Image src={data.logo.node.sourceUrl} alt={data.logo.node.altText || "Logo"} width={200} height={50} className="block h-10 md:h-12.5 w-auto" /> : <span className="text-white text-lg font-bold">Logo</span>}
                </Link>
                <nav className="hidden md:flex items-center">
                    <div className="md:flex items-center">
                        <NavLinks className="block menu-link px-4" />
                    </div>
                    <div className="flex gap-2 items-center pl-3">
                        <Link href="/contact" className="block btn-rounded btn-primary h-8 w-8">
                            <PhoneIcon className="block h-full w-auto text-current" aria-hidden="true" />
                        </Link>
                    </div>
                </nav>
                <Hamburger />
            </div>
            <MenuModal data={{ logoUrl: data?.logo?.node?.sourceUrl || null, logoAlt: data?.logo?.node?.altText || null, phone: "123456790", email: "example@example.com" }} />
        </header>
    )
}

export default Header
