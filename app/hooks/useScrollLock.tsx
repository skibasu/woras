"use client"

import { useEffect } from "react"

const useScrollLock = (isLocked: boolean) => {
    useEffect(() => {
        if (!isLocked) return

        const scrollY = window.scrollY

        const body = document.body
        const html = document.documentElement

        const previousBodyStyles = {
            position: body.style.position,
            top: body.style.top,
            left: body.style.left,
            right: body.style.right,
            width: body.style.width,
            overflow: body.style.overflow,
        }

        const previousHtmlOverflow = html.style.overflow

        body.style.position = "fixed"
        body.style.top = `-${scrollY}px`
        body.style.left = "0"
        body.style.right = "0"
        body.style.width = "100%"
        body.style.overflow = "hidden"

        html.style.overflow = "hidden"

        return () => {
            body.style.position = previousBodyStyles.position
            body.style.top = previousBodyStyles.top
            body.style.left = previousBodyStyles.left
            body.style.right = previousBodyStyles.right
            body.style.width = previousBodyStyles.width
            body.style.overflow = previousBodyStyles.overflow

            html.style.overflow = previousHtmlOverflow

            window.scrollTo(0, scrollY)
        }
    }, [isLocked])
}

export default useScrollLock
