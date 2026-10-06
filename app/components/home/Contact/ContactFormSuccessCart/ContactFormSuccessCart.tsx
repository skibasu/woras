"use client"
import { useContactFormContext } from "@/app/context/ContactFormContext"

import SuccessMessage from "../SuccessMessage/SuccessMessage"
import Modal from "@/app/components/ui/Modal/Modal"

import { AnimatePresence } from "motion/react"
type Props = {
    eyebrow: string | null
    successMessage: string | null
    description: string | null
    accentText: string | null
}
const ContactFormSuccessCart = ({ eyebrow, successMessage, description, accentText }: Props) => {
    const { isSuccess, clearSubmissionResult } = useContactFormContext()

    return (
        <>
            <AnimatePresence>
                {isSuccess && (
                    <Modal onClose={clearSubmissionResult} className="bg-gray-800/50 backdrop-blur-sm">
                        <SuccessMessage onClose={clearSubmissionResult} eyebrow={eyebrow} successMessage={successMessage} description={description} accentText={accentText} />
                    </Modal>
                )}
            </AnimatePresence>
        </>
    )
}

export default ContactFormSuccessCart
