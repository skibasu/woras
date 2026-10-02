import { Share, Squada_One, Rubik } from "next/font/google"

import { wordpressClient } from "@/lib/wpgraphql"
import { ContactDocument, GlobalSettingsDocument } from "@/graphql/generated/graphql"

import "./globals.css"

import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"
import { MenuContextProvider } from "./context/MenuContext"

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
    const contactData = await wordpressClient.request(ContactDocument)
    const settingsData = await wordpressClient.request(GlobalSettingsDocument)

    const { email, phone } = { email: contactData.page?.contactPage?.email, phone: contactData.page?.contactPage?.phone }
    const data = settingsData.page?.generalSettingsFields?.branding
    return (
        <html lang="en" className={`${squadaOne.variable} ${share.variable} ${roboto.variable} h-full`}>
            <body className="min-h-full flex flex-col antialiased">
                <MenuContextProvider>
                    <Header data={data} />
                </MenuContextProvider>

                {children}

                <Footer email={email || null} phone={phone || null} />
            </body>
        </html>
    )
}

export default RootLayout
