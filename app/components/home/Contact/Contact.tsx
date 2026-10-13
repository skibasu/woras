import { ContactPageDocument as ContactDocument } from "@/graphql/generated/graphql"
import { wordpressClient } from "@/lib/wpgraphql"
import { getGeneralSettings } from "@/lib/getGeneralSettings"
import { ContactFormProvider } from "@/app/context/ContactFormContext"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import OpeningHours from "./OpeningHours"
import ContactInfo from "./ContactInfo"
import WhatsApp from "./Whatsapp"
import ContactFormResultView from "./ContactFormSuccessCart/ContactFormSuccessCart"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"
import ContactForm from "./ContactForm/ConatctForm"
import { ErrorMessages } from "./ContactForm/validation"

export const getContactPageData = async () => {
    return await wordpressClient.request(ContactDocument)
}

const Contact = async () => {
    const [data, settings] = await Promise.all([getContactPageData(), getGeneralSettings()])

    const errorMesseges = {
        ERROR_NAME_OR_PHONE_REQUIRED: data?.page?.contactPage?.eNameOrPhoneRequired || "",
        ERROR_NAME_FORBIDDEN_CHARACTERS: data?.page?.contactPage?.eNameForbiddenCharacters || "",
        ERROR_NAME_TOO_LONG: data?.page?.contactPage?.eNameToLong || "",
        ERROR_NAME_TOO_SHORT: data?.page?.contactPage?.eNameToShort || "",

        ERROR_PHONE_TOO_LONG: data?.page?.contactPage?.ePhoneToLong || "",
        ERROR_PHONE_INVALID: data?.page?.contactPage?.ePhoneNotValid || "",

        ERROR_EMAIL_INVALID: data?.page?.contactPage?.eEmailNotValid || "",
        ERROR_EMAIL_REQUIRED: data?.page?.contactPage?.eEmailRequired || "",
        ERROR_MESSAGE_REQUIRED: data?.page?.contactPage?.eMessageRequired || "",
        ERROR_MESSAGE_TOO_SHORT: data?.page?.contactPage?.eMessageToShort || "",
        ERROR_MESSAGE_TOO_LONG: data?.page?.contactPage?.eMessageToLong || "",
    } as ErrorMessages

    const { phoneNumber, companyEmail, companyName } = settings || {}

    return (
        <ContactFormProvider>
            <section
                id="contact"
                className="page-section section-y-spacing relative overflow-hidden"
            >
                <ProgressiveImage
                    src="images/picture-contact-bgr.webp"
                    alt="background"
                    className="object-cover w-full h-full"
                    fill={true}
                    containerClassName="absolute inset-0 z-0 w-full h-[70%] xl:h-full"
                    onLoadOpacity={0.15}
                    loading="eager"
                />

                <div className="main-container relative">
                    <SectionTitle
                        className="mb-10 lg:mb-16"
                        title={data?.page?.contactPage?.title}
                        titleAccent={data?.page?.contactPage?.titleAccent}
                        accentEnd={data?.page?.contactPage?.accentEnd}
                        eyebrow={data?.page?.contactPage?.eyebrow}
                        subtitle={data?.page?.contactPage?.subtitle}
                    />

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 mb-20">
                        <div className="cart bg-white p-6 lg:p-8 xl:col-span-2 xl:order-2 relative overflow-hidden">
                            <ContactForm
                                title={data?.page?.contactPage?.contactFormTitle || null}
                                namePlaceholder={data?.page?.contactPage?.labelForInputName || null}
                                emailPlaceholder={data?.page?.contactPage?.labelForInputEmail || null}
                                messagePlaceholder={data?.page?.contactPage?.placeholderForTextarea || null}
                                addImagesLabel={null}
                                sendButtonText={data?.page?.contactPage?.labelForSubmitButton || null}
                                description={data?.page?.contactPage?.contactFormDescription || null}
                                contactFormRodoLabel={data?.page?.contactPage?.contactFormRodoLabel || null}
                                errorMessegaes={errorMesseges}
                            />
                            <ContactFormResultView
                                eyebrow={data?.page?.contactPage?.successMessageEyebrow || null}
                                successMessage={data?.page?.contactPage?.successMessage || null}
                                description={data?.page?.contactPage?.successMessageDescription || null}
                                accentText={data?.page?.contactPage?.successMessageAccent || null}
                            />
                        </div>

                        <div className="cart p-6 lg:p-8 xl:col-span-1 xl:order-1">
                            <ContactInfo
                                companyName={companyName || null}
                                phoneNumber={phoneNumber || null}
                                companyEmail={companyEmail || null}
                            />
                            <div className="my-8 h-px w-full bg-black/10" />
                            <OpeningHours items={data?.page?.contactPage?.openingHours} />
                        </div>
                    </div>
                    <WhatsApp
                        url={phoneNumber || null}
                        eyebrow={data.page?.contactPage?.eyebrow || null}
                        subtitle={data.page?.contactPage?.whatsappSubtitle || null}
                    />
                </div>
            </section>
        </ContactFormProvider>
    )
}

export default Contact
