"use client"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import ClipIcon from "@/app/components/ui/IconsSvg/ClipIcon"
import Input from "@/app/components/ui/Form/Input"
import Textarea from "@/app/components/ui/Form/Textarea"

const MAX_IMAGES = 10
const MAX_IMAGE_DIMENSION = 1600
const JPEG_QUALITY = 0.8
const MAX_TOTAL_PAYLOAD_BYTES = 18 * 1024 * 1024

const schema = yup
    .object({
        login: yup.string().required("Name or phone is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        message: yup.string().required("Message is required"),
    })
    .required()

interface FormData {
    login: string
    email: string
    message: string
}

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

const ContactForm = () => {
    const [images, setImages] = useState<File[]>([])
    const [imagesError, setImagesError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [fileInputKey, setFileInputKey] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: FormData) => {
        if (loading) {
            return
        }

        setSuccessMessage(null)
        setErrorMessage(null)

        try {
            setLoading(true)
            const attachments = await Promise.all(images.map((image) => resizeImageToJpegDataUrl(image)))
            const totalAttachmentBytes = attachments.reduce((sum, attachment) => sum + base64DataUrlSizeBytes(attachment.data), 0)

            if (totalAttachmentBytes > MAX_TOTAL_PAYLOAD_BYTES) {
                setImagesError("Selected images are too large to send. Please remove some images or choose smaller files.")
                setErrorMessage("Attachments exceed safe email size limits.")
                setLoading(false)
                return
            }

            const response = await fetch("/contact.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login: data.login,
                    email: data.email,
                    message: data.message,
                    attachments,
                }),
            })

            let result: { success?: boolean; message?: string } = {}
            try {
                result = await response.json()
            } catch {
                result = {}
            }

            if (!response.ok) {
                setErrorMessage(result.message || "Server returned an error while sending the message.")
                setLoading(false)
                return
            }

            if (result.success === true) {
                setSuccessMessage("Your message has been sent successfully!")
                setImages([])
                setImagesError(null)
                setErrorMessage(null)
                reset()
                setFileInputKey((prev) => prev + 1)
            } else {
                setErrorMessage(result.message || "Message was not accepted by the mail service.")
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error instanceof Error && error.message) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("A network error occurred while sending the message. Please try again later.")
            }
            console.error(error)
        }
    }
    const onPickImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pickedFiles = Array.from(event.target.files ?? [])
        const nextCount = images.length + pickedFiles.length

        if (nextCount > MAX_IMAGES) {
            const allowed = Math.max(0, MAX_IMAGES - images.length)
            const accepted = pickedFiles.slice(0, allowed)

            setImages((prev) => [...prev, ...accepted])
            setImagesError(`You can attach up to ${MAX_IMAGES} images.`)
            event.target.value = ""
            return
        }

        setImages((prev) => [...prev, ...pickedFiles])
        setImagesError(null)
        event.target.value = ""
    }

    const removeImage = (indexToRemove: number) => {
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove))
        setImagesError(null)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2 className="mb-6">Contact Form</h2>
            <p className="mb-8 text-black/70">Tell us what&apos;s wrong and we&apos;ll help you get back on the road.</p>
            <Input className="mb-6 relative z-10" placeholder="Your name or phone number" {...register("login")} />
            <Input className="mb-6 relative z-10" type="email" placeholder="Your email" {...register("email")} />
            <Textarea className="mb-6 relative z-10 max-h-50" placeholder="Describe your problem" {...register("message")} />

            <input key={fileInputKey} ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={onPickImages} />

            <div className="mb-6">
                <p className="text-reset mb-2">Add images</p>
                <div className="flex gap-2">
                    <button type="button" className="text-accent disabled:opacity-60" onClick={() => fileInputRef.current?.click()} aria-label="Attach images" disabled={loading}>
                        <ClipIcon className="block h-6 w-6 text-current" aria-hidden="true" />
                    </button>
                    <p className="text-sm text-accent">
                        {images.length} / {MAX_IMAGES}
                    </p>
                </div>

                {imagesError ? <p className="mt-2 text-sm text-red-600">{imagesError}</p> : null}

                {images.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                        {images.map((image, index) => (
                            <li key={`${image.name}-${image.lastModified}-${index}`} className="flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-3 py-2">
                                <span className="truncate pr-3 text-sm text-black/80">{image.name}</span>
                                <button type="button" className="text-sm text-red-600 hover:text-red-700 disabled:opacity-60" onClick={() => removeImage(index)} disabled={loading}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>

            <div>
                <button type="submit" className="btn btn-primary disabled:opacity-60" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                </button>
            </div>

            {successMessage ? <p className="mt-3 text-sm text-green-700">{successMessage}</p> : null}
            {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}

            <p className="mt-2 text-sm text-red-600">{errors.login?.message}</p>
            <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
            <p className="mt-2 text-sm text-red-600">{errors.message?.message}</p>
        </form>
    )
}
export default ContactForm
