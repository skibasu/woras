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
                                sourceUrl
                                altText
                            }
                        }
                    }
                }

                gallery {
                    title
                    description
                    slides {
                        image {
                            node {
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
                                sourceUrl
                                altText
                            }
                        }
                        title
                        description
                    }
                    accentImage {
                        node {
                            sourceUrl
                            altText
                        }
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
                title
                heroImage {
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
        page(id: 65, idType: DATABASE_ID) {
            generalSettingsFields {
                branding {
                    logo {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    favicon {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                }
            }
        }
    }
`
