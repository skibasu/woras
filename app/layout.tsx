import { Squada_One, Rubik } from "next/font/google"

import { wordpressClient } from "@/lib/wpgraphql"
import { ContactPageDocument, GlobalSettingsDocument } from "@/graphql/generated/graphql"

import "./globals.css"

import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"
import { MenuContextProvider } from "./context/MenuContext"

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

const RootLayout = async ({ children }: LayoutProps<"/">) => {
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
