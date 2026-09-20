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
                }
            }
        }
    }
`
