"use client"

import { useBreakpoint } from "@/app/hooks/useBreakpoiint"

type Props = {
    text: string
    maxLength: number
    mobileMaxLength?: number
}

export const TextExcerpt = ({ text, maxLength, mobileMaxLength }: Props) => {
    const { isMobile, isReady } = useBreakpoint()
    const limit = isMobile && mobileMaxLength !== undefined ? mobileMaxLength : maxLength

    if (text.length <= limit) {
        return <>{text}</>
    }

    return isReady ? <>{text.slice(0, limit)}...</> : null
}
