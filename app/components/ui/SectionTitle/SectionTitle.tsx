"use client"
import clsx from "clsx"

import { motion, stagger, Variants } from "motion/react"

type TextTypes = string | null | undefined

interface Props {
    title: TextTypes
    titleAccent: TextTypes
    accentEnd: TextTypes
    eyebrow: TextTypes
    subtitle: TextTypes
    textColor?: "light" | "dark"
    className?: string
}
const variants: Variants = {
    hidden: { opacity: 0, y: 55 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}
const titleVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, opacity: { duration: 0.75 }, ease: "easeOut" } },
}
const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,

        transition: {
            delayChildren: stagger(0.15, { startDelay: 0.1 }),
            // staggerChildren: 0.15,
        },
    },
}
const SectionTitle = ({
    title,
    titleAccent,
    accentEnd,
    eyebrow,
    subtitle,
    textColor = "dark",
    className: customClassName,
}: Props) => {
    const className = textColor === "light" ? "text-white/80" : "text-black/40"
    const classNameTitle = textColor === "light" ? "text-white" : "text-black"
    return (
        <motion.div
            className={customClassName}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: "all", once: true }}
        >
            {eyebrow && (
                <motion.p
                    key="eyebrow"
                    className={clsx(
                        "text-eyebrow text-black/70 flex justify-center items-center with-accent-separator-right with-accent-separator-left mb-2 lg:mb-4",
                        className
                    )}

                    variants={variants}
                >
                    {eyebrow}
                </motion.p>
            )}

            <motion.h2
                key="title"
                className={clsx("text-title text-center mb-3", classNameTitle)}
                variants={titleVariants}
            >
                {title}
                {titleAccent && <span className="text-accent">{` ${titleAccent}`}</span>}
                {accentEnd && <span>{accentEnd.length > 1 ? ` ${accentEnd}` : accentEnd}</span>}
            </motion.h2>
            {subtitle && (
                <motion.p
                    key="subtitle"
                    variants={variants}
                    className={clsx("text-subtitle-small text-center uppercase", className)}
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    )
}

export default SectionTitle
