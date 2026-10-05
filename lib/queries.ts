import { gql } from "graphql-request"

export const HOME_QUERY = gql`
    query Home {
        page(id: 9, idType: DATABASE_ID) {
            title

            homePage {
                hero {
                    eyebrow
                    slogan
                    sloganAccent
                    sloganEnd
                    subtitle
                    buttonText
                    buttonUrl
                    backgroundImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    mobileBackgroundImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    accentImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    serviceList {
                        serviceTitle
                        serviceIcon {
                            node {
                                id
                                sourceUrl
                                altText
                            }
                        }
                    }
                }

                gallery {
                    eyebrow
                    title
                    titleAccent
                    accentEnd
                    subtitle
                    slides {
                        image {
                            node {
                                id
                                sourceUrl
                                altText
                            }
                        }
                    }
                }

                reviews {
                    eyebrow
                    title
                    titleAccent
                    accentEnd
                    subtitle
                    backgroundImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    mobileBackgroundImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                }

                features {
                    eyebrow
                    title
                    titleAccent
                    accentEnd
                    subtitle
                    items {
                        image {
                            node {
                                id
                                sourceUrl
                                altText
                            }
                        }
                        title
                        description
                    }
                }
            }
        }
    }
`
export const PRICING_QUERY = gql`
    query Pricing {
        page(id: 30, idType: DATABASE_ID) {
            title
            pricingPage {
                eyebrow
                title
                titleAccent
                accentEnd
                subtitle
                heroImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
                mobileBackgroundImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
                categories {
                    categoryTitle
                    categoryIcon {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    thumbnail {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    categoryDescription
                    items {
                        itemTitle
                        itemDescription
                        price
                    }
                }
                footerText
            }
        }
    }
`
export const GLOBAL_SETTINGS_QUERY = gql`
    query GlobalSettings {
        page(id: "65", idType: DATABASE_ID) {
            generalSettingsFields {
                logo {
                    node {
                        altText
                        uri
                    }
                }

                favicon {
                    node {
                        uri
                        altText
                    }
                }

                companyName
                companyEmail
                phoneNumber
                city

                contactButtonLabel

                footerSubtitle
                copyrights
            }
        }
    }
`
export const CONTACT_QUERY = gql`
    query ContactPage {
        page(id: "44", idType: DATABASE_ID) {
            contactPage {
                eyebrow
                title
                titleAccent
                accentEnd
                subtitle

                openingHours {
                    day
                    from
                    to
                    closed
                }

                whatsupEyeBrow

                whatsappTitle
                whatsappSubtitle
                whatsappButtonLabel

                contactFormTitle
                labelForInputName
                labelForInputEmail
                placeholderForTextarea
                labelForSubmitButton
                successMessageEyebrow
                successMessage
                successMessageAccent
                successMessageDescription
            }
        }
    }
`
