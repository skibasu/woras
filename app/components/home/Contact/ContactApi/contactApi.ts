import type { FormData } from "@/app/components/home/Contact/ContactForm/ConatctForm"
export async function sendContactMessage(data: FormData): Promise<{ success: boolean; error?: string }> {
    const response = await fetch("https://px661515.pxcloud.pl/api/contact.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send message")
    }

    return result
}
