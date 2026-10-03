"use client"

import clsx from "clsx"
import { useEffect, useRef, useState } from "react"

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
    mobileUrl?: string
}

const HeroPicture = ({ src, alt, mobileUrl, className, fetchPriority = "high", ...rest }: Props) => {
    const imgRef = useRef<HTMLImageElement>(null)
    const [loaded, setLoaded] = useState(false)

    const handleLoad = async () => {
        const img = imgRef.current

        if (!img) return

        try {
            await img.decode()
        } catch {
            // Obraz może być już zdekodowany lub wystąpić błąd dekodowania
        }

        setLoaded(true)
    }

    useEffect(() => {
        const img = imgRef.current

        if (img?.complete && img.naturalWidth > 0) {
            handleLoad()
        }
    }, [])

    return (
        <picture className={clsx("absolute inset-0 z-0 h-full w-full", className)}>
            {mobileUrl && <source media="(max-width: 767px)" srcSet={mobileUrl} />}

            <img {...rest} ref={imgRef} src={src} alt={alt} loading="eager" decoding="async" fetchPriority={fetchPriority} onLoad={handleLoad} onError={() => setLoaded(true)} className={clsx("absolute inset-0 h-full w-full object-cover transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")} />
        </picture>
    )
}

export default HeroPicture
