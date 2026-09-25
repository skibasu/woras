"use client"
import { useContactFormContext } from "@/app/context/ContactFormContext"
import ContactForm from "../ContactForm/ConatctForm"
import SuccessMessage from "../SuccessMessage/SuccessMessage"

const ContactFormResultView = () => {
    const { isSuccess, successMessage } = useContactFormContext()

    return isSuccess ? <SuccessMessage /> : <ContactForm />
}

export default ContactFormResultView
