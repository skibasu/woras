"use client"

import { useRef, useState, type ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useContactFormContext } from "@/app/context/ContactFormContext"
import ClipIcon from "@/app/components/ui/IconsSvg/ClipIcon"
import Input from "@/app/components/ui/Form/Input"
import Textarea from "@/app/components/ui/Form/Textarea"
import Button from "@/app/components/ui/Button/Button"
import clsx from "clsx"
import ContactFormAttachments, { useContactFormAttachments } from "./ContactFormAttachments"
import { sendContactMessage } from "../ContactApi/contactApi"
import Select from "@/app/components/ui/Form/Select"
import { FieldType, formatPhoneNumber, getFieldType } from "./utils"
import { getRecaptchaToken } from "@/lib/recaptcha"
import { createContactFormSchema, ErrorMessages } from "./validation"
import { CountryCode, getCountryCallingCode } from "libphonenumber-js"

export interface FormData {
    login: string
    email: string
    message: string
    countryCode?: string
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
    errorMessegaes: ErrorMessages
}

const ContactForm = ({
    title,
    description,
    namePlaceholder,
    emailPlaceholder,
    messagePlaceholder,
    sendButtonText,
    addImagesLabel,
    contactFormRodoLabel,
    errorMessegaes,
}: Props) => {
    const { setSubmissionResult, clearSubmissionResult } = useContactFormContext()

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [fileInputKey, setFileInputKey] = useState(0)
    const [fieldType, setFieldType] = useState<FieldType>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { images, imagesError, maxImages, addFiles, removeImage, clearImages, buildAttachments } =
        useContactFormAttachments()
    const schema = createContactFormSchema(errorMessegaes)
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        mode: "onChange",
        reValidateMode: "onChange",

        resolver: yupResolver(schema),
        defaultValues: {
            login: "",
            email: "",
            message: "",
            countryCode: "NL",
        },
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
            const callingCode = getCountryCallingCode(data.countryCode as CountryCode)

            const prefixedLogin = fieldType === "phone" ? `+${callingCode}${data.login.replace(/\s/g, "")}` : data.login
            const res = await sendContactMessage(
                {
                    login: prefixedLogin,
                    email: data.email,
                    message: data.message,
                },
                attachments,
                recaptchaToken
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
            setFieldType(null)
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

    const loginRegister = register("login", {
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value || ""
            const trimmedValue = value

            if (trimmedValue.length === 0) {
                if (fieldType !== null) {
                    setFieldType(null)
                }
                return
            }

            if (fieldType === null) {
                setFieldType(getFieldType(trimmedValue))
            } else if (fieldType === "phone") {
                const formattedValue = formatPhoneNumber(trimmedValue, getValues("countryCode") as CountryCode)
                setValue("login", formattedValue, {
                    shouldValidate: true,
                    shouldDirty: true,
                })
            }
        },
    })

    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="mb-6 text-3xl">{title}</h2>

            <p className="mb-8">{description}</p>

            <div className="flex w-full flex-col gap-1">
                <div className="relative z-20 pb-9">
                    {fieldType === "phone" && (
                        <Select
                            initialCountryCode={getValues("countryCode") as CountryCode}
                            className="absolute left-0 top-0 z-2"
                            onChange={(value) => {
                                setValue("countryCode", value)
                            }}
                        />
                    )}
                    <Input
                        placeholder={namePlaceholder || "Your name or phone number"}
                        {...loginRegister}
                        isError={!!errors.login?.message}
                        className={clsx(fieldType === "phone" && "pl-28")}
                    />

                    {errors.login?.message && (
                        <p className="absolute bottom-4 left-0 text-[12px] text-red-600">{errors.login.message}</p>
                    )}
                </div>

                <div className="relative z-10 pb-9">
                    <Input
                        type="email"
                        placeholder={emailPlaceholder || "Your email"}
                        {...register("email")}
                        isError={!!errors.email?.message}
                    />

                    {errors.email?.message && (
                        <p className="absolute bottom-4 left-0 text-[12px] text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div className="relative z-10 pb-7.5">
                    <Textarea
                        placeholder={messagePlaceholder || "Describe your problem"}
                        {...register("message")}
                        className={clsx(errors.message?.message && "border-b border-red-600 bg-red-50", "max-h-50")}
                    />

                    {errors.message?.message && (
                        <p className="absolute bottom-4 left-0 text-[12px] text-red-600">{errors.message.message}</p>
                    )}
                </div>

                <div
                    className="relative z-10 pb-1"
                    dangerouslySetInnerHTML={{
                        __html: contactFormRodoLabel || "",
                    }}
                />
            </div>

            <input
                key={fileInputKey}
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={onPickImages}
            />

            <div className="mb-6 mt-2">
                <p className="text-reset mb-2">{addImagesLabel || "Add images"}</p>

                <div className="flex gap-2">
                    <button
                        type="button"
                        className="text-accent disabled:opacity-60"
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Attach images"
                        disabled={loading}
                    >
                        <ClipIcon
                            className="block h-6 w-6 text-current"
                            aria-hidden="true"
                        />
                    </button>

                    <p className="text-sm text-accent font-bold">
                        {images.length} / {maxImages}
                    </p>
                </div>

                <ContactFormAttachments
                    images={images}
                    imagesError={imagesError}
                    loading={loading}
                    onRemoveImage={removeImage}
                />
            </div>

            <div>
                <Button
                    size="large"
                    label={loading ? `${sendButtonText || "Send"}...` : sendButtonText || "Send"}
                    disabled={loading}
                    type="submit"
                />
            </div>

            {errorMessage && (
                <p
                    role="alert"
                    className="mt-3 text-sm text-red-600"
                >
                    {errorMessage}
                </p>
            )}
        </form>
    )
}

export default ContactForm
