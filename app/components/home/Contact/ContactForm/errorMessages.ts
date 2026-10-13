import { getContactPageData } from "../Contact"

export const initErrorMessages = {
    ERROR_NAME_OR_PHONE_REQUIRED: "Name or phone is required",
    ERROR_NAME_FORBIDDEN_CHARACTERS: "Phone number contains forbidden characters",
    ERROR_NAME_TOO_LONG: "Name is too long",
    ERROR_PHONE_TOO_LONG: "Phone number is too long",
    ERROR_PHONE_INVALID: "Invalid phone number",

    ERROR_NAME_TOO_SHORT: "Name must contain at least 2 characters",

    ERROR_EMAIL_INVALID: "Invalid email format",
    ERROR_EMAIL_REQUIRED: "Email is required",
    ERROR_MESSAGE_REQUIRED: "Message is required",
    ERROR_MESSAGE_TOO_SHORT: "Message must be at least 10 characters long",
    ERROR_MESSAGE_TOO_LONG: "Message is too long",
} as const

export const getForbiddenCharactersErrorMessage = (message: string, forbiddenCharacters: string) =>
    `${message} "${forbiddenCharacters}"`

export const getErrorsMessages = async () => {
    const data = await getContactPageData()
    if (!data?.page?.contactPage) {
        throw new Error("Contact page data is not available")
    }
    const {
        eNameOrPhoneRequired,
        eNameForbiddenCharacters,
        eNameToLong,
        eNameToShort,
        ePhoneToLong,
        ePhoneNotValid,
        eEmailRequired,
        eEmailNotValid,
        eMessageRequired,
        eMessageToShort,
        eMessageToLong,
    } = data?.page?.contactPage || {}

    const errorMessages = initErrorMessages
    return {
        ERROR_NAME_OR_PHONE_REQUIRED: eNameOrPhoneRequired || errorMessages.ERROR_NAME_OR_PHONE_REQUIRED,
        ERROR_NAME_FORBIDDEN_CHARACTERS: eNameForbiddenCharacters || errorMessages.ERROR_NAME_FORBIDDEN_CHARACTERS,
        ERROR_NAME_TOO_LONG: eNameToLong || errorMessages.ERROR_NAME_TOO_LONG,
        ERROR_NAME_TOO_SHORT: eNameToShort || errorMessages.ERROR_NAME_TOO_SHORT,

        ERROR_PHONE_TOO_LONG: ePhoneToLong || errorMessages.ERROR_PHONE_TOO_LONG,
        ERROR_PHONE_INVALID: ePhoneNotValid || errorMessages.ERROR_PHONE_INVALID,

        ERROR_EMAIL_INVALID: eEmailNotValid || errorMessages.ERROR_EMAIL_INVALID,
        ERROR_EMAIL_REQUIRED: eEmailRequired || errorMessages.ERROR_EMAIL_REQUIRED,
        ERROR_MESSAGE_REQUIRED: eMessageRequired || errorMessages.ERROR_MESSAGE_REQUIRED,
        ERROR_MESSAGE_TOO_SHORT: eMessageToShort || errorMessages.ERROR_MESSAGE_TOO_SHORT,
        ERROR_MESSAGE_TOO_LONG: eMessageToLong || errorMessages.ERROR_MESSAGE_TOO_LONG,
    }
}
