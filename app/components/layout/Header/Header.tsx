import { GlobalSettingsQuery } from "@/graphql/generated/graphql"
import Link from "next/link"
import Hamburger from "./Hamburger/Hamburger"
import MenuModal from "./MenuModal/MenuModal"
import NavLinks from "./NavLinks/NavLinks"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"
import WhatsupMobileButton from "../../ui/WhatsupMobileButton"

type HeaderProps = {
    data: NonNullable<NonNullable<GlobalSettingsQuery["page"]>["generalSettingsFields"]>["branding"] | undefined
}
const Header = ({ data }: HeaderProps) => {
    return (
        <header id="header" className="header w-full flex items-center">
            <div className="page-section py-2 flex justify-between items-center">
                <Link href="/" className="block">
                    {data?.logo?.node?.sourceUrl ? <ProgressiveImage src={data.logo.node.sourceUrl} alt={data.logo.node.altText || "Logo"} width={200} height={50} className="block h-10 w-auto" /> : <span className="text-white text-lg font-bold">Logo</span>}
                </Link>
                <nav className="hidden lg:flex items-center">
                    <div className="md:flex items-center lg:gap-2 xl:gap-6 pr-6">
                        <NavLinks className="block menu-link px-3" />
                    </div>
                    <div className="flexitems-center pl-9 border-l border-gray-600">
                        <WhatsupMobileButton href="https://wa.me/1234567890" className="bg-primary px-4" iconWidth={20} iconHeight={20} label="WhatsApp" />
                    </div>
                </nav>
                <Hamburger />
            </div>
            <MenuModal data={{ logoUrl: data?.logo?.node?.sourceUrl || null, logoAlt: data?.logo?.node?.altText || null, phone: "123456790", email: "example@example.com" }} />
        </header>
    )
}

export default Header
