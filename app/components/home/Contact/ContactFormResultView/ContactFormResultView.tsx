"use client"
import { useContactFormContext } from "@/app/context/ContactFormContext"

import SuccessMessage from "../SuccessMessage/SuccessMessage"
import Modal from "@/app/components/ui/Modal/Modal"
import ContactForm from "../ContactForm/ConatctForm"
import { AnimatePresence } from "motion/react"

const ContactFormResultView = () => {
    const { isSuccess, clearSubmissionResult } = useContactFormContext()

    return (
        <>
            <ContactForm />
            <AnimatePresence>
                {isSuccess && (
                    <Modal onClose={clearSubmissionResult} className="bg-gray-400/20 backdrop-blur-sm">
                        <SuccessMessage onClose={clearSubmissionResult} />
                    </Modal>
                )}
            </AnimatePresence>
        </>
    )
}

export default ContactFormResultView
