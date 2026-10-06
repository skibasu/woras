import { wordpressClient } from "@/lib/wpgraphql"
import { Hero } from "./components/home/Hero/Hero"
import { HomeDocument } from "@/graphql/generated/graphql"
import Features from "./components/home/Features/Features"
import Reviews from "./components/home/Reviews/Reviews"
import Gallery from "./components/home/Gallery/Gallery"
import Pricing from "./components/home/Pricing/Pricing"
import Contact from "./components/home/Contact/Contact"
import { GalleryContextProvider } from "./context/GalleryContext"
import WhatsupMobileButton from "./components/ui/WhatsAppMobileButton"
import { getGeneralSettings } from "@/lib/getGeneralSettings"

const Home = async () => {
    const data = await wordpressClient.request(HomeDocument)
    const settingsData = await getGeneralSettings()
    return (
        <main>
            <Hero data={data.page?.homePage?.hero} />
            <Features data={data.page?.homePage?.features} />

            <Reviews data={data.page?.homePage?.reviews} />
            <GalleryContextProvider>
                <Gallery data={data.page?.homePage?.gallery} />
            </GalleryContextProvider>
            <Pricing />
            <Contact />
            <WhatsupMobileButton iconWidth={28} iconHeight={28} className="fixed bottom-6 right-6 z-50 lg:hidden bg-whatsapp-hover" label={""} phoneNumber={settingsData?.phoneNumber || null} />
        </main>
    )
}

export default Home
