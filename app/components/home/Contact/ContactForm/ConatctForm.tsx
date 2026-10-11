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
import { sendContactMessage } from "../ContactApi/contactApi"

declare global {
    interface Window {
        grecaptcha?: {
            enterprise?: {
                ready: (callback: () => void) => void
                execute: (siteKey: string, options: { action: string }) => Promise<string>
            }
        }
    }
}

let recaptchaLoadPromise: Promise<void> | null = null

const loadRecaptchaEnterprise = (siteKey: string): Promise<void> => {
    if (window.grecaptcha?.enterprise) {
        return Promise.resolve()
    }

    if (recaptchaLoadPromise) {
        return recaptchaLoadPromise
    }

    recaptchaLoadPromise = new Promise<void>((resolve, reject) => {
        const scriptSelector = 'script[data-recaptcha-enterprise="true"]'
        let script = document.querySelector<HTMLScriptElement>(scriptSelector)

        const handleLoad = () => {
            if (window.grecaptcha?.enterprise) {
                resolve()
            } else {
                reject(new Error("reCAPTCHA Enterprise could not be initialized."))
            }
        }

        const handleError = () => {
            reject(new Error("Failed to load reCAPTCHA Enterprise."))
        }

        if (!script) {
            script = document.createElement("script")
            script.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(siteKey)}`
            script.async = true
            script.dataset.recaptchaEnterprise = "true"
        }

        script.addEventListener("load", handleLoad, { once: true })
        script.addEventListener("error", handleError, { once: true })

        if (!script.isConnected) {
            document.head.appendChild(script)
        }
    }).catch((error: unknown) => {
        recaptchaLoadPromise = null
        throw error
    })

    return recaptchaLoadPromise
}

const getRecaptchaToken = async (): Promise<string> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

    if (!siteKey) {
        throw new Error("reCAPTCHA is not configured.")
    }

    await loadRecaptchaEnterprise(siteKey)

    const enterprise = window.grecaptcha?.enterprise

    if (!enterprise) {
        throw new Error("reCAPTCHA Enterprise could not be initialized.")
    }

    return new Promise<string>((resolve, reject) => {
        enterprise.ready(() => {
            enterprise
                .execute(siteKey, { action: "contact_submit" })
                .then((token) => {
                    if (!token) {
                        reject(new Error("reCAPTCHA returned an empty token."))
                        return
                    }

                    resolve(token)
                })
                .catch(reject)
        })
    })
}

const schema = yup
    .object({
        login: yup.string().required("Name or phone is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        message: yup.string().required("Message is required"),
    })
    .required()

export interface FormData {
    login: string
    email: string
    message: string
}

type Props = {
    title: string | null
    description: string | null
    namePlaceholder: string | null
    emailPlaceholder: string | null
    messagePlaceholder: string | null
    sendButtonText: string | null
    addImagesLabel: string | null
    contactFormRodoLabel: string | null
}

const ContactForm = ({ title, description, namePlaceholder, emailPlaceholder, messagePlaceholder, sendButtonText, addImagesLabel, contactFormRodoLabel }: Props) => {
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
        setLoading(true)

        try {
            const recaptchaToken = await getRecaptchaToken()
            const attachments = await buildAttachments()

            const res = await sendContactMessage(
                {
                    login: data.login,
                    email: data.email,
                    message: data.message,
                },
                attachments,
                recaptchaToken,
            )

            if (!res.success) {
                throw new Error(res.error || res.message || "Failed to send message")
            }

            setSubmissionResult({
                isSuccess: true,
                successMessage: "Your message has been sent successfully!",
            })

            clearImages()
            reset()
            setFileInputKey((prev) => prev + 1)
        } catch (error) {
            clearSubmissionResult()

            if (error instanceof Error && error.message) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("A network error occurred while sending the message. Please try again later.")
            }

            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onPickImages = (event: ChangeEvent<HTMLInputElement>) => {
        addFiles(Array.from(event.target.files ?? []))
        event.target.value = ""
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-6 text-3xl">{title}</h2>

            <p className="mb-8 text-black/70">{description}</p>

            <div className="flex w-full flex-col gap-1">
                <div className="relative z-10 pb-9">
                    <Input placeholder={namePlaceholder || "Your name or phone number"} {...register("login")} isError={!!errors.login?.message} />

                    {errors.login?.message && <p className="absolute bottom-4 left-0 text-[12px] text-red-600">{errors.login.message}</p>}
                </div>

                <div className="relative z-10 pb-9">
                    <Input type="email" placeholder={emailPlaceholder || "Your email"} {...register("email")} isError={!!errors.email?.message} />

                    {errors.email?.message && <p className="absolute bottom-4 left-0 text-[12px] text-red-600">{errors.email.message}</p>}
                </div>

                <div className="relative z-10 pb-7.5">
                    <Textarea placeholder={messagePlaceholder || "Describe your problem"} {...register("message")} className={clsx(errors.message?.message && "border-b border-red-600 bg-red-50", "max-h-50")} />

                    {errors.message?.message && <p className="absolute bottom-4 left-0 text-[12px] text-red-600">{errors.message.message}</p>}
                </div>

                <div
                    className="relative z-10 pb-1"
                    dangerouslySetInnerHTML={{
                        __html: contactFormRodoLabel || "",
                    }}
                />
            </div>

            <input key={fileInputKey} ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={onPickImages} />

            <div className="mb-6 mt-2">
                <p className="text-reset mb-2">{addImagesLabel || "Add images"}</p>

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
                <Button size="large" label={loading ? `${sendButtonText || "Send"}...` : sendButtonText || "Send"} disabled={loading} type="submit" />
            </div>

            {errorMessage && (
                <p role="alert" className="mt-3 text-sm text-red-600">
                    {errorMessage}
                </p>
            )}
        </form>
    )
}

export default ContactForm
