"use client"
import { useMenuContext } from "@/app/context/MenuContext"
import MenuDrawer from "../MenuDrawer/MenuDrawer"
import MobileMenu from "../MobileMenu/MobileMenu"
import Portal from "@/app/components/ui/Portal/Portal"

interface Props {
    data: {
        logoUrl: string | null
        logoAlt: string | null
        phone: string | null
        email: string | null
        city?: string | null
    }
}

const MenuModal = ({ data }: Props) => {
    const { isMenuOpen } = useMenuContext()
    return (
        <Portal isOpen={isMenuOpen}>
            <MenuDrawer>
                <MobileMenu data={{ logoUrl: data.logoUrl, logoAlt: data.logoAlt, phone: data.phone, email: data.email, city: data.city }} />
            </MenuDrawer>
        </Portal>
    )
}

export default MenuModal
