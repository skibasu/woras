"use client"

import { useCallback, useRef } from "react"

type PreviousStyles = {
    bodyOverflow: string
    htmlOverflow: string
    bodyPaddingRight: string
}

const useScrollLock = () => {
    const isLockedRef = useRef(false)
    const previousStylesRef = useRef<PreviousStyles | null>(null)

    const lockScroll = useCallback(() => {
        if (isLockedRef.current || typeof document === "undefined") {
            return
        }

        const body = document.body
        const html = document.documentElement

        previousStylesRef.current = {
            bodyOverflow: body.style.overflow,
            htmlOverflow: html.style.overflow,
            bodyPaddingRight: body.style.paddingRight,
        }

        // Prevent layout shift when the scrollbar disappears.
        const scrollbarWidth = window.innerWidth - html.clientWidth

        if (scrollbarWidth > 0) {
            const currentPadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0

            body.style.paddingRight = `${currentPadding + scrollbarWidth}px`
        }

        // Do not change body positioning: Motion can measure layout normally.
        html.style.overflow = "hidden"
        body.style.overflow = "hidden"

        isLockedRef.current = true
    }, [])

    const unLockScroll = useCallback(() => {
        if (!isLockedRef.current) return

        const previous = previousStylesRef.current

        if (previous) {
            document.body.style.overflow = previous.bodyOverflow
            document.documentElement.style.overflow = previous.htmlOverflow
            document.body.style.paddingRight = previous.bodyPaddingRight
        }

        previousStylesRef.current = null
        isLockedRef.current = false
    }, [])

    return { lockScroll, unLockScroll }
}

export default useScrollLock
