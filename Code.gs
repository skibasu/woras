const TO_EMAIL = "your@email.com"
const MAX_ATTACHMENTS = 10

function jsonResponse(payload) {
    return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON)
}

function dataUrlToBlob(attachment) {
    const name = String((attachment && attachment.name) || "attachment.jpg")
    const data = String((attachment && attachment.data) || "")
    const match = data.match(/^data:([^;]+);base64,(.+)$/)

    if (!match) {
        throw new Error("Invalid attachment format.")
    }

    const mimeType = match[1] || "image/jpeg"
    const base64 = match[2]
    const bytes = Utilities.base64Decode(base64)
    return Utilities.newBlob(bytes, mimeType, name)
}

function doPost(e) {
    try {
        if (!e || !e.postData || !e.postData.contents) {
            return jsonResponse({ success: false, message: "Missing request body." })
        }

        const data = JSON.parse(e.postData.contents)

        // Keep honeypot behavior if frontend sends it.
        const honeypot = String((data && data.website) || "").trim()
        if (honeypot) {
            return jsonResponse({ success: true })
        }

        const name = String((data && data.login) || "").trim()
        const email = String((data && data.email) || "").trim()
        const message = String((data && data.message) || "").trim()
        const attachments = Array.isArray(data && data.attachments) ? data.attachments : []

        if (!name || !email || !message) {
            return jsonResponse({ success: false, message: "Missing required fields." })
        }

        if (!/@/.test(email)) {
            return jsonResponse({ success: false, message: "Invalid email." })
        }

        if (attachments.length > MAX_ATTACHMENTS) {
            return jsonResponse({ success: false, message: "Too many attachments." })
        }

        const subject = "New contact form message"
        const body = ["New message from contact form:", "", "Name / phone: " + name, "Email: " + email, "", "Message:", message].join("\n")

        const blobs = attachments.map(dataUrlToBlob)

        MailApp.sendEmail({
            to: TO_EMAIL,
            subject: subject,
            body: body,
            replyTo: email,
            attachments: blobs,
        })

        return jsonResponse({ success: true })
    } catch (error) {
        return jsonResponse({
            success: false,
            message: error && error.message ? String(error.message) : "Unexpected server error.",
        })
    }
}
