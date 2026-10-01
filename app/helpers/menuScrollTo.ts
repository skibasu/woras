import { animate } from "motion/react"

export const menuScrollTo = (target: string, offsetHeader: boolean = true) => {
    const element = document.querySelector(`#${target}`)
    const header = document.querySelector("#header")

    if (!element) return

    const headerHeight = offsetHeader ? (header?.getBoundingClientRect().height ?? 0) : 0

    const targetPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight

    return animate(window.scrollY, targetPosition, {
        duration: 0.8,
        ease: "easeInOut",
        onUpdate: (latest) => window.scrollTo(0, latest),
    })
}
