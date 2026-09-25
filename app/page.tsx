import { wordpressClient } from "@/lib/wpgraphql"
import { Hero } from "./components/home/Hero/Hero"
import { HomeDocument } from "@/graphql/generated/graphql"
import Features from "./components/home/Features/Features"
import Reviews from "./components/home/Reviews/Reviews"
import Gallery from "./components/home/Gallery/Gallery"
import Pricing from "./components/home/Pricing/Pricing"
import Contact from "./components/home/Contact/Contact"

const Home = async () => {
    const data = await wordpressClient.request(HomeDocument)

    return (
        <main>
            <Hero data={data.page?.homePage?.hero} />
            <Features data={data.page?.homePage?.features} />

            <Reviews data={data.page?.homePage?.reviews} />
            <Gallery data={data.page?.homePage?.gallery} />
            <Pricing />
            <Contact />
        </main>
    )
}

export default Home
