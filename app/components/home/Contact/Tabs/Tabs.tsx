"use client"
import { useContactFormContext } from "@/app/context/ContactFormContext"
import ContactForm from "../ContactForm/ConatctForm"

const Tabs = () => {
    const { isSuccess, successMessage } = useContactFormContext()

    return isSuccess ? <p>{successMessage}</p> : <ContactForm />
}

export default Tabs
