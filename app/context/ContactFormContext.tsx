"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

type ContactFormContextValue = {
    isSuccess: boolean
    setIsSuccess: (value: boolean) => void
    successMessage: string | null
    setSuccessMessage: (value: string | null) => void
}

const ContactFormContext = createContext<ContactFormContextValue | null>(null)

type ContactFormProviderProps = {
    children: ReactNode
}

export const ContactFormProvider = ({ children }: ContactFormProviderProps) => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const value = useMemo(
        () => ({
            isSuccess,
            setIsSuccess,
            successMessage,
            setSuccessMessage,
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
