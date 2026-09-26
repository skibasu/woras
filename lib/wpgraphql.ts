import { GraphQLClient } from "graphql-request"

export const wordpressClient = new GraphQLClient("https://px661515.pxcloud.pl/cms/graphql", {
    fetch: (url, options) =>
        fetch(url, {
            ...options,
            cache: "no-store",
        }),
})
