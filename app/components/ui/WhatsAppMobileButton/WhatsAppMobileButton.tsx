"use client"

import Link from "next/link"
import clsx from "clsx"
import { motion, useReducedMotion } from "motion/react"
import WhatsAppIcon from "../IconsSvg/WhatsAppIcon"

type Props = {
    iconWidth: number
    iconHeight: number
    label?: string | null
    className?: string
    phoneNumber: string | null
}

const WhatsAppMobileButton = ({ className = "", iconWidth, iconHeight, label, phoneNumber }: Props) => {
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.div
            className="inline-flex"
            animate={
                shouldReduceMotion
                    ? undefined
                    : {
                          scale: [1, 1.08, 0.96, 1.08, 1, 1.06, 0.96, 1.08, 1, 1.12, 0.96, 1.08, 1, 1],
                      }
            }
            transition={
                shouldReduceMotion
                    ? undefined
                    : {
                          duration: 7.5,
                          times: [0, 0.045, 0.075, 0.11, 0.15, 0.195, 0.225, 0.26, 0.3, 0.345, 0.375, 0.41, 0.45, 1],
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "loop",

                          repeatDelay: 120,
                      }
            }
        >
            <Link
                aria-label={label ? undefined : "Open WhatsApp"}
                className={clsx(
                    "inline-flex p-2 items-center justify-center gap-2 rounded-full text-white text-sm font-semibold hover:bg-whatsapp-hover hover:shadow-sm transition-colors",
                    className
                )}
                href={`https://wa.me/${phoneNumber ?? ""}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <WhatsAppIcon
                    className="block"
                    style={{ width: iconWidth, height: iconHeight }}
                    aria-hidden="true"
                />
                {label && <span>{label}</span>}
            </Link>
        </motion.div>
    )
}

export default WhatsAppMobileButton
