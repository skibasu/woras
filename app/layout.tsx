import { Squada_One, Rubik } from "next/font/google"

import "./globals.css"

import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"
import { MenuContextProvider } from "./context/MenuContext"
import { Metadata } from "next"
import { getGeneralSettings } from "@/lib/getGeneralSettings"
import { IconURL } from "next/dist/lib/metadata/types/metadata-types"

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getGeneralSettings()

    return {
        title: settings?.websiteTitle || "test",

        description: settings?.websiteDescription,

        icons: {
            icon: settings?.favicon?.node?.sourceUrl as IconURL,
        },
    }
}
const squadaOne = Squada_One({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-squada-one",
    display: "swap",
})
const roboto = Rubik({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-roboto",
    display: "swap",
})

const RootLayout = ({ children }: LayoutProps<"/">) => {
    return (
        <html lang="en" className={`${squadaOne.variable} ${roboto.variable} h-full`}>
            <body className="min-h-full flex flex-col antialiased">
                <MenuContextProvider>
                    <Header />
                </MenuContextProvider>

                {children}

                <Footer />
            </body>
        </html>
    )
}

export default RootLayout
