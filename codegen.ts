import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
    schema: "https://px661515.pxcloud.pl/cms/graphql",

    documents: ["lib/**/*.ts", "lib/**/*.tsx", "app/**/*.ts", "app/**/*.tsx"],

    generates: {
        "./graphql/generated/": {
            preset: "client",
        },
    },
}

export default config
