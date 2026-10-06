import Link from "next/link"
import Hamburger from "./Hamburger/Hamburger"
import MenuModal from "./MenuModal/MenuModal"
import NavLinks from "./NavLinks/NavLinks"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"
import WhatsupMobileButton from "../../ui/WhatsupMobileButton"

import { getGeneralSettings } from "@/lib/getGeneralSettings"

const Header = async () => {
    const data = await getGeneralSettings()
    const { logo, companyEmail, phoneNumber, city, phoneNumberSubtitle, emailSubtitle, cityAdressSubtitle, whatsappButtonLabel } = data || {}
    const menuData = { logoUrl: logo?.node?.sourceUrl || null, logoAlt: logo?.node?.altText || null, phone: phoneNumber || null, email: companyEmail || null, city: city || null, whatsappButtonLabel: whatsappButtonLabel || null, phoneNumberSubtitle: phoneNumberSubtitle || null, emailSubtitle: emailSubtitle || null, cityAdressSubtitle: cityAdressSubtitle || null }
    return (
        <header id="header" className="header w-full flex items-center">
            <div className="page-section py-2 flex justify-between items-center">
                <Link href="/" className="block">
                    {logo?.node?.sourceUrl ? <ProgressiveImage src={logo.node.sourceUrl} alt={logo.node.altText || "Logo"} width={200} height={50} className="block h-10 w-auto" /> : <span className="text-white text-lg font-bold">Logo</span>}
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
            <MenuModal data={menuData} />
        </header>
    )
}

export default Header
