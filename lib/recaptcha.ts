declare global {
    interface Window {
        grecaptcha?: {
            enterprise?: {
                ready: (callback: () => void) => void
                execute: (siteKey: string, options: { action: string }) => Promise<string>
            }
        }
    }
}

let recaptchaLoadPromise: Promise<void> | null = null

const loadRecaptchaEnterprise = (siteKey: string): Promise<void> => {
    if (window.grecaptcha?.enterprise) {
        return Promise.resolve()
    }

    if (recaptchaLoadPromise) {
        return recaptchaLoadPromise
    }

    recaptchaLoadPromise = new Promise<void>((resolve, reject) => {
        const scriptSelector = 'script[data-recaptcha-enterprise="true"]'
        let script = document.querySelector<HTMLScriptElement>(scriptSelector)

        const handleLoad = () => {
            if (window.grecaptcha?.enterprise) {
                resolve()
            } else {
                reject(new Error("reCAPTCHA Enterprise could not be initialized."))
            }
        }

        const handleError = () => {
            reject(new Error("Failed to load reCAPTCHA Enterprise."))
        }

        if (!script) {
            script = document.createElement("script")
            script.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(siteKey)}`
            script.async = true
            script.dataset.recaptchaEnterprise = "true"
        }

        script.addEventListener("load", handleLoad, { once: true })
        script.addEventListener("error", handleError, { once: true })

        if (!script.isConnected) {
            document.head.appendChild(script)
        }
    }).catch((error: unknown) => {
        recaptchaLoadPromise = null
        throw error
    })

    return recaptchaLoadPromise
}

export const getRecaptchaToken = async (action = "contact_submit"): Promise<string> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

    if (!siteKey) {
        throw new Error("reCAPTCHA is not configured.")
    }

    await loadRecaptchaEnterprise(siteKey)

    const enterprise = window.grecaptcha?.enterprise

    if (!enterprise) {
        throw new Error("reCAPTCHA Enterprise could not be initialized.")
    }

    return new Promise<string>((resolve, reject) => {
        enterprise.ready(() => {
            enterprise
                .execute(siteKey, { action })
                .then((token) => {
                    if (!token) {
                        reject(new Error("reCAPTCHA returned an empty token."))
                        return
                    }

                    resolve(token)
                })
                .catch(reject)
        })
    })
}
