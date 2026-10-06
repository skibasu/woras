"use client"

import clsx from "clsx"
import Image, { type ImageProps } from "next/image"
import { useEffect, useRef, useState } from "react"

type Props = Omit<ImageProps, "onLoad" | "onError"> & {
    containerClassName?: string
    onLoadOpacity?: number
    loading?: "lazy" | "eager"
}

const ProgressiveImage = ({ containerClassName = "", className = "", alt, onLoadOpacity = 1, loading, ...imageProps }: Props) => {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const image = imageRef.current

        if (image?.complete && image.naturalWidth > 0) {
            setLoaded(true)
        }
    }, [])

    return (
        <div className={clsx("overflow-hidden", containerClassName)}>
            <Image
                {...imageProps}
                alt={alt}
                ref={imageRef}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                style={{
                    opacity: loaded ? onLoadOpacity : 0,
                }}
                className={clsx("transition-all duration-700 ease-in-out", className)}
                loading={loading}
            />

            {error && <div className="absolute inset-0 "></div>}
        </div>
    )
}

export default ProgressiveImage
