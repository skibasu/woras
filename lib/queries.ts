import { gql } from "graphql-request"

export const HOME_QUERY = gql`
    query Home {
        page(id: 9, idType: DATABASE_ID) {
            title

            homePage {
                hero {
                    slogan
                    buttonText
                    buttonUrl
                    backgroundImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                }

                gallery {
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
                    title
                    backgroundImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                }

                features {
                    title
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
                }
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
