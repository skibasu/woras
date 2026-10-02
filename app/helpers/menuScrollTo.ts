import { animate } from "motion/react"

export const menuScrollTo = (target: string, offsetHeader: boolean = true) => {
    if (target === "home") {
        return animate(window.scrollY, 0, {
            duration: 0.8,
            ease: "easeInOut",
            onUpdate: (latest) => window.scrollTo(0, latest),
        })
    }

    const element = document.querySelector(`#${target}`)
    const header = document.querySelector("#header")

    if (!element) return

    const headerHeight = offsetHeader ? (header?.getBoundingClientRect().height ?? 0) : 0

    const targetPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
    const clampedTargetPosition = Math.min(Math.max(targetPosition, 0), maxScroll)

    return animate(window.scrollY, clampedTargetPosition, {
        duration: 0.8,
        ease: "easeInOut",
        onUpdate: (latest) => window.scrollTo(0, latest),
    })
}
