"use client"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
    mobileUrl?: string
}

const HeroPicture = ({ src, alt, mobileUrl, className, fetchPriority = "auto", ...rest }: Props) => {
    const imgRef = useRef<HTMLImageElement>(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const img = imgRef.current

        if (img?.complete && img.naturalWidth > 0) {
            setLoaded(true)
        }
    }, [])

    return (
        <picture className={clsx(`absolute inset-0 z-0 w-full h-full`, className)}>
            <source media="(max-width: 767px)" srcSet={mobileUrl} />

            <img src={src} alt={alt} ref={imgRef} className={clsx("h-full w-full object-cover absolute inset-0 transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")} onLoad={() => setLoaded(true)} onError={() => setLoaded(true)} fetchPriority={fetchPriority} {...rest} />
        </picture>
    )
}

export default HeroPicture
