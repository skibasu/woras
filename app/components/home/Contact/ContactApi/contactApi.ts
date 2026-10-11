import type { FormData } from "@/app/components/home/Contact/ContactForm/ConatctForm"

export interface MailAttachment {
    name: string
    data: string
}

interface ContactMessageResponse {
    success: boolean
    error?: string
    message?: string
}

export async function sendContactMessage(data: FormData, attachments: MailAttachment[], recaptchaToken: string): Promise<ContactMessageResponse> {
    const response = await fetch("https://px661515.pxcloud.pl/api/contact/contact.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...data,
            attachments,
            recaptchaToken,
        }),
    })

    const result: ContactMessageResponse = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || "Failed to send message")
    }

    return result
}
