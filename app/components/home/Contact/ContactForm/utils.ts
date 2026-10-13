import { AsYouType, CountryCode } from "libphonenumber-js"

const NumberRegex = /^[0-9]/

const TextRegex = /^\p{L}/u

const isPhoneNumber = (value: string): boolean => NumberRegex.test(value)

const isLogin = (value: string): boolean => TextRegex.test(value)
export type FieldType = "phone" | "login" | null

export const getFieldType = (value: string): FieldType => {
    if (isPhoneNumber(value)) {
        return "phone"
    } else if (isLogin(value)) {
        return "login"
    } else {
        return null
    }
}

export const formatPhoneNumber = (value: string, country: CountryCode): string => {
    return new AsYouType(country).input(value.replace(/\D/g, ""))
}

export const getForbiddenCharacters = (value: string) => {
    const allowedCharacters = /[\p{L}\p{M}\s'-.,!?():;]/u

    return [...new Set([...value].filter((char) => !allowedCharacters.test(char)))]
}
