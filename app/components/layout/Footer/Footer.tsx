import { GlobalSettingsQuery } from "@/graphql/generated/graphql"

type FooterProps = {
    data: NonNullable<NonNullable<GlobalSettingsQuery["page"]>["generalSettingsFields"]>["branding"] | undefined
}
const Footer = ({ data }: FooterProps) => {
    console.log(data)
    return <footer className="w-full p-4"></footer>
}

export default Footer
