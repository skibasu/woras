"use client"
import { useMenuContext } from "@/app/context/MenuContext"
import MenuDrawer from "../MenuDrawer/MenuDrawer"
import MobileMenu from "../MobileMenu/MobileMenu"
import Portal from "@/app/components/ui/Portal/Portal"
import { AnimatePresence, motion } from "motion/react"
import Overlay from "@/app/components/ui/Overlay/Overlay"
import useScrollLock from "@/app/hooks/useScrollLock"
import { useEffect } from "react"

interface Props {
    data: {
        logoUrl: string | null
        logoAlt: string | null
        phone: string | null
        email: string | null
        city: string | null
        whatsappButtonLabel: string | null
        phoneNumberSubtitle: string | null
        emailSubtitle: string | null
        cityAdressSubtitle: string | null
    }
}

const MenuModal = ({ data }: Props) => {
    const { isMenuOpen, setIsMenuOpen } = useMenuContext()
    const { lockScroll, unLockScroll } = useScrollLock()

    useEffect(() => {
        if (isMenuOpen) {
            lockScroll()
        } else {
            unLockScroll()
        }

        return () => {
            unLockScroll()
        }
    }, [isMenuOpen, lockScroll, unLockScroll])

    useEffect(() => {
        if (!isMenuOpen) {
            return
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false)
            }
        }

        window.addEventListener("keydown", handleEscape)

        return () => {
            window.removeEventListener("keydown", handleEscape)
        }
    }, [isMenuOpen, setIsMenuOpen])

    const mobileMenuData = { logoUrl: data.logoUrl, logoAlt: data.logoAlt, phone: data.phone, email: data.email, city: data.city, whatsappButtonLabel: data.whatsappButtonLabel, phoneNumberDescription: data.phoneNumberSubtitle, emailDescription: data.emailSubtitle, cityDescription: data.cityAdressSubtitle }

    return (
        <Portal>
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div key="mobile-menu" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.4, ease: "easeInOut" }} className="fixed inset-0 z-100 w-65 max-w-3/4 rounded-br-lg rounded-tr-lg overflow-y-auto mobile-menu-gradient">
                            <MenuDrawer>
                                <MobileMenu data={mobileMenuData} />
                            </MenuDrawer>
                        </motion.div>
                        <motion.button type="button" aria-label="Close menu" onClick={() => setIsMenuOpen(false)} key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="fixed inset-0 z-50">
                            <Overlay gradientClassName="bg-gray-800/50 backdrop-blur-sm" />
                        </motion.button>
                    </>
                )}
            </AnimatePresence>
        </Portal>
    )
}

export default MenuModal
