"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

type ContactFormContextValue = {
    isSuccess: boolean
    successMessage: string | null
    setSubmissionResult: (value: { isSuccess: boolean; successMessage: string | null }) => void
    clearSubmissionResult: () => void
}

const ContactFormContext = createContext<ContactFormContextValue | null>(null)

type ContactFormProviderProps = {
    children: ReactNode
}

export const ContactFormProvider = ({ children }: ContactFormProviderProps) => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const setSubmissionResult = ({ isSuccess, successMessage }: { isSuccess: boolean; successMessage: string | null }) => {
        setIsSuccess(isSuccess)
        setSuccessMessage(successMessage)
    }

    const clearSubmissionResult = () => {
        setIsSuccess(false)
        setSuccessMessage(null)
    }

    const value = useMemo(
        () => ({
            isSuccess,
            successMessage,
            setSubmissionResult,
            clearSubmissionResult,
        }),
        [isSuccess, successMessage],
    )

    return <ContactFormContext.Provider value={value}>{children}</ContactFormContext.Provider>
}

export const useContactFormContext = () => {
    const context = useContext(ContactFormContext)

    if (!context) {
        throw new Error("useContactFormContext must be used within ContactFormProvider")
    }

    return context
}
