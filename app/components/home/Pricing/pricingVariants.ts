import type { Variants } from "motion/react"

export const desktopVariants: Variants[] = [
    {
        hidden: { scale: 0.6, x: "160%" },
        visible: {
            scale: 1,
            x: "0%",
            transition: { duration: 0.65, ease: "easeOut" },
        },
    },
    {
        hidden: { scale: 0.7, x: "75%" },
        visible: {
            scale: 1,
            x: "0%",
            transition: { duration: 0.65, ease: "easeOut" },
        },
    },
    {
        hidden: { scale: 0.8, x: "-75%" },
        visible: {
            scale: 1,
            x: "0%",
            transition: { duration: 0.65, ease: "easeOut" },
        },
    },
    {
        hidden: { scale: 0.9, x: "-160%" },
        visible: {
            scale: 1,
            x: "0%",
            transition: { duration: 0.65, ease: "easeOut" },
        },
    },
]

export const tabletVariants: Variants[] = [
    {
        hidden: { scale: 0.8, y: 50, opacity: 0, rotate: -10 },
        visible: {
            scale: 1,
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: { duration: 0.55, ease: "easeOut" },
        },
    },
    {
        hidden: { scale: 0.8, y: 50, opacity: 0, rotate: 10 },
        visible: {
            scale: 1,
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: { duration: 0.55, ease: "easeOut" },
        },
    },
    {
        hidden: { scale: 0.8, y: 50, opacity: 0, rotate: -10 },
        visible: {
            scale: 1,
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: { duration: 0.55, ease: "easeOut" },
        },
    },
    {
        hidden: { scale: 0.8, y: 50, opacity: 0, rotate: 10 },
        visible: {
            scale: 1,
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: { duration: 0.55, ease: "easeOut" },
        },
    },
]
