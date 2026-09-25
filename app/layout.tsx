import { Share, Squada_One, Rubik, Lato } from "next/font/google"

import { wordpressClient } from "@/lib/wpgraphql"
import { GlobalSettingsDocument } from "@/graphql/generated/graphql"

import "./globals.css"

import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"

const share = Share({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-share",
})
const squadaOne = Squada_One({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-squada-one",
})
const roboto = Rubik({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-roboto",
})

const RootLayout = async ({ children }: LayoutProps<"/">) => {
    const data = await wordpressClient.request(GlobalSettingsDocument)

    const settings = data.page?.generalSettingsFields?.branding

    return (
        <html lang="en" className={`${squadaOne.variable} ${share.variable} ${roboto.variable} h-full`}>
            <body className="min-h-full flex flex-col antialiased">
                <Header data={settings} />

                {children}

                <Footer data={settings} />
            </body>
        </html>
    )
}

export default RootLayout
