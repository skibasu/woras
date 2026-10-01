"use client"
import { useMenuContext } from "@/app/context/MenuContext"
import MenuDrawer from "../MenuDrawer/MenuDrawer"
import MobileMenu from "../MobileMenu/MobileMenu"
import Portal from "@/app/components/ui/Portal/Portal"
import { AnimatePresence, motion } from "motion/react"
import Overlay from "@/app/components/ui/Overlay/Overlay"
import useScrollLock from "@/app/hooks/useScrollLock"

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
    useScrollLock(isMenuOpen)
    return (
        <Portal>
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div key="mobile-menu" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.4, ease: "easeInOut" }} className="fixed inset-0 z-100 w-65 max-w-3/4 rounded-br-lg rounded-tr-lg overflow-hidden">
                            <MenuDrawer>
                                <MobileMenu data={{ logoUrl: data.logoUrl, logoAlt: data.logoAlt, phone: data.phone, email: data.email, city: data.city }} />
                            </MenuDrawer>
                        </motion.div>
                        <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="fixed inset-0 z-50 bg-black/50">
                            <Overlay />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/*  */}
        </Portal>
    )
}

export default MenuModal
