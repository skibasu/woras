import { GlobalSettingsDocument, GlobalSettingsQuery } from "@/graphql/generated/graphql"
import { wordpressClient } from "./wpgraphql"

export const getGeneralSettings = async (): Promise<NonNullable<NonNullable<GlobalSettingsQuery["page"]>["generalSettingsFields"]> | undefined> => {
    const { page } = await wordpressClient.request(GlobalSettingsDocument)

    return {
        logo: page?.generalSettingsFields?.logo || null,
        favicon: page?.generalSettingsFields?.favicon || null,
        companyName: page?.generalSettingsFields?.companyName || null,
        companyEmail: page?.generalSettingsFields?.companyEmail || null,
        phoneNumber: page?.generalSettingsFields?.phoneNumber || null,
        city: page?.generalSettingsFields?.city || null,
        contactButtonLabel: page?.generalSettingsFields?.contactButtonLabel || null,
        footerSubtitle: page?.generalSettingsFields?.footerSubtitle || null,
        copyrights: page?.generalSettingsFields?.copyrights || null,
        phoneNumberSubtitle: page?.generalSettingsFields?.phoneNumberSubtitle || null,
        emailSubtitle: page?.generalSettingsFields?.emailSubtitle || null,
        cityAdressSubtitle: page?.generalSettingsFields?.cityAdressSubtitle || null,
        whatsappButtonLabel: page?.generalSettingsFields?.whatsappButtonLabel || null,
    }
}
