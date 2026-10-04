"use client"

import { useState } from "react"

const MAX_IMAGES = 10
const MAX_IMAGE_DIMENSION = 1600
const JPEG_QUALITY = 0.8
const MAX_TOTAL_PAYLOAD_BYTES = 18 * 1024 * 1024

type MailAttachment = {
    name: string
    data: string
}

const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result)
                return
            }
            reject(new Error("Could not read selected file."))
        }

        reader.onerror = () => reject(new Error("Failed to read selected file."))
        reader.readAsDataURL(file)
    })
}

const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve(image)
        image.onerror = () => reject(new Error("Failed to load image for processing."))
        image.src = src
    })
}

const getJpegName = (fileName: string): string => {
    const dotIndex = fileName.lastIndexOf(".")
    const baseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName
    return `${baseName}.jpg`
}

const base64DataUrlSizeBytes = (dataUrl: string): number => {
    const base64 = dataUrl.split(",")[1] ?? ""
    const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0
    return Math.floor((base64.length * 3) / 4) - padding
}

const resizeImageToJpegDataUrl = async (file: File): Promise<MailAttachment> => {
    const sourceDataUrl = await readFileAsDataUrl(file)
    const image = await loadImage(sourceDataUrl)

    const maxSide = Math.max(image.width, image.height)
    const scale = maxSide > MAX_IMAGE_DIMENSION ? MAX_IMAGE_DIMENSION / maxSide : 1
    const targetWidth = Math.max(1, Math.round(image.width * scale))
    const targetHeight = Math.max(1, Math.round(image.height * scale))

    const canvas = document.createElement("canvas")
    canvas.width = targetWidth
    canvas.height = targetHeight

    const context = canvas.getContext("2d")
    if (!context) {
        throw new Error("Image processing is not available in this browser.")
    }

    context.drawImage(image, 0, 0, targetWidth, targetHeight)
    const outputDataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY)

    if (!outputDataUrl.startsWith("data:image/jpeg;base64,")) {
        throw new Error("Image conversion to JPEG failed.")
    }

    return {
        name: getJpegName(file.name),
        data: outputDataUrl,
    }
}

export const useContactFormAttachments = () => {
    const [images, setImages] = useState<File[]>([])
    const [imagesError, setImagesError] = useState<string | null>(null)

    const addFiles = (pickedFiles: File[]) => {
        const nextCount = images.length + pickedFiles.length

        if (nextCount > MAX_IMAGES) {
            const allowed = Math.max(0, MAX_IMAGES - images.length)
            const accepted = pickedFiles.slice(0, allowed)

            setImages((prev) => [...prev, ...accepted])
            setImagesError(`You can attach up to ${MAX_IMAGES} images.`)
            return
        }

        setImages((prev) => [...prev, ...pickedFiles])
        setImagesError(null)
    }

    const removeImage = (indexToRemove: number) => {
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove))
        setImagesError(null)
    }

    const clearImages = () => {
        setImages([])
        setImagesError(null)
    }

    const buildAttachments = async () => {
        const attachments = await Promise.all(images.map((image) => resizeImageToJpegDataUrl(image)))
        const totalAttachmentBytes = attachments.reduce((sum, attachment) => sum + base64DataUrlSizeBytes(attachment.data), 0)

        if (totalAttachmentBytes > MAX_TOTAL_PAYLOAD_BYTES) {
            setImagesError("Selected images are too large to send. Please remove some images or choose smaller files.")
            throw new Error("Attachments exceed safe email size limits.")
        }

        setImagesError(null)
        return attachments
    }

    return {
        images,
        imagesError,
        maxImages: MAX_IMAGES,
        addFiles,
        removeImage,
        clearImages,
        buildAttachments,
    }
}

type ContactFormAttachmentsProps = {
    images: File[]
    imagesError: string | null
    loading: boolean
    onRemoveImage: (index: number) => void
}

const ContactFormAttachments = ({ images, imagesError, loading, onRemoveImage }: ContactFormAttachmentsProps) => {
    return (
        <>
            {imagesError ? <p className="mt-2 text-sm text-red-600">{imagesError}</p> : null}

            {images.length > 0 ? (
                <ul className="mt-4 space-y-2">
                    {images.map((image, index) => (
                        <li key={`${image.name}-${image.lastModified}-${index}`} className="flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-3 py-2">
                            <span className="truncate pr-3 text-sm text-black/80">{image.name}</span>
                            <button type="button" className="text-sm text-red-600 hover:text-red-700 disabled:opacity-60" onClick={() => onRemoveImage(index)} disabled={loading}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </>
    )
}

export default ContactFormAttachments
