"use client"

import { useRef, useState, type ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useContactFormContext } from "@/app/context/ContactFormContext"
import ClipIcon from "@/app/components/ui/IconsSvg/ClipIcon"
import Input from "@/app/components/ui/Form/Input"
import Textarea from "@/app/components/ui/Form/Textarea"
import Button from "@/app/components/ui/Button/Button"
import clsx from "clsx"
import ContactFormAttachments, { useContactFormAttachments } from "./ContactFormAttachments"

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

const ContactForm = () => {
    const { setSubmissionResult, clearSubmissionResult } = useContactFormContext()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [fileInputKey, setFileInputKey] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { images, imagesError, maxImages, addFiles, removeImage, clearImages, buildAttachments } = useContactFormAttachments()

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

        clearSubmissionResult()
        setErrorMessage(null)

        try {
            setLoading(true)
            const attachments = await buildAttachments()

            console.log("CONTACT FORM SUBMISSION", {
                login: data.login,
                email: data.email,
                message: data.message,
                attachments,
            })

            setSubmissionResult({
                isSuccess: true,
                successMessage: "Your message has been sent successfully!",
            })
            clearImages()
            setErrorMessage(null)
            reset()
            setFileInputKey((prev) => prev + 1)

            setLoading(false)
        } catch (error) {
            clearSubmissionResult()
            setLoading(false)
            if (error instanceof Error && error.message) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("A network error occurred while sending the message. Please try again later.")
            }
            console.error(error)
        }
    }
    const onPickImages = (event: ChangeEvent<HTMLInputElement>) => {
        addFiles(Array.from(event.target.files ?? []))
        event.target.value = ""
    }

    return (
        <form noValidate>
            <h2 className="mb-6">Contact Form</h2>
            <p className="mb-8 text-black/70">Tell us what&apos;s wrong and we&apos;ll help you get back on the road.</p>
            <div className="flex flex-col gap-1 w-full">
                <div className="relative z-10 pb-9">
                    <Input placeholder="Your name or phone number" {...register("login")} isError={!!errors.login?.message} />
                    {errors.login?.message && <p className="text-[12px] text-red-600 absolute bottom-4 left-0">{errors.login?.message}</p>}
                </div>
                <div className="relative z-10 pb-9">
                    <Input type="email" placeholder="Your email" {...register("email")} isError={!!errors.email?.message} />
                    {errors.email?.message && <p className="text-[12px] text-red-600 absolute bottom-4 left-0">{errors.email?.message}</p>}
                </div>
                <div className="relative z-10 pb-9">
                    <Textarea placeholder="Describe your problem" {...register("message")} className={clsx(errors.message?.message && "border-b border-red-600 bg-red-50", "max-h-50")} />
                    {errors.message?.message && <p className="text-[12px] text-red-600 absolute bottom-4 left-0">{errors.message?.message}</p>}
                </div>
            </div>
            <input key={fileInputKey} ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={onPickImages} />

            <div className="mb-6">
                <p className="text-reset mb-2">Add images</p>
                <div className="flex gap-2">
                    <button type="button" className="text-accent disabled:opacity-60" onClick={() => fileInputRef.current?.click()} aria-label="Attach images" disabled={loading}>
                        <ClipIcon className="block h-6 w-6 text-current" aria-hidden="true" />
                    </button>
                    <p className="text-sm text-accent">
                        {images.length} / {maxImages}
                    </p>
                </div>
                <ContactFormAttachments images={images} imagesError={imagesError} loading={loading} onRemoveImage={removeImage} />
            </div>

            <div>
                <Button onClick={handleSubmit(onSubmit)} size="large" label={loading ? "Sending..." : "Send"} disabled={loading} />
            </div>

            {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}
        </form>
    )
}
export default ContactForm
