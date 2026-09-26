import { GraphQLClient } from "graphql-request"

const graphqlUrl = `https://px661515.pxcloud.pl/cms/graphql?build=${Date.now()}`

export const wordpressClient = new GraphQLClient(graphqlUrl)
