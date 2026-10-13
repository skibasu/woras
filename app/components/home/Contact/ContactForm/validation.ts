import * as yup from "yup"
import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js/max"
import { getForbiddenCharacters } from "./utils"
import { initErrorMessages, getForbiddenCharactersErrorMessage } from "./errorMessages"

export type ErrorMessages = typeof initErrorMessages

export const createContactFormSchema = (errorMessages: ErrorMessages = initErrorMessages) =>
    yup
        .object({
            login: yup
                .string()
                .required(errorMessages.ERROR_NAME_OR_PHONE_REQUIRED)
                .test("login-validation", function (value) {
                    const country = this.parent.countryCode as CountryCode
                    const trimmedValue = value.trim().replace(/\s/g, "")
                    if (!trimmedValue) return true

                    const hasDigits = /^\d+$/.test(trimmedValue)

                    if (hasDigits) {
                        if (trimmedValue.length > 15) {
                            return this.createError({
                                message: errorMessages.ERROR_PHONE_TOO_LONG,
                            })
                        }
                        return (
                            isValidPhoneNumber(trimmedValue, country) ||
                            this.createError({
                                message: errorMessages.ERROR_PHONE_INVALID,
                            })
                        )
                    } else {
                        const forbiddenCharacters = getForbiddenCharacters(trimmedValue)

                        if (forbiddenCharacters.length > 0) {
                            return this.createError({
                                message: getForbiddenCharactersErrorMessage(
                                    errorMessages.ERROR_NAME_FORBIDDEN_CHARACTERS,
                                    forbiddenCharacters.join(",")
                                ),
                            })
                        }
                        return (
                            value.trim().length >= 2 ||
                            this.createError({
                                message: errorMessages.ERROR_NAME_TOO_SHORT,
                            })
                        )
                    }
                }),

            countryCode: yup.string(),
            email: yup.string().email(errorMessages.ERROR_EMAIL_INVALID).required(errorMessages.ERROR_EMAIL_REQUIRED),
            message: yup
                .string()
                .required(errorMessages.ERROR_MESSAGE_REQUIRED)
                .min(10, errorMessages.ERROR_MESSAGE_TOO_SHORT),
        })
        .required()
