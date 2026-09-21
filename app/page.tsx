import { wordpressClient } from "@/lib/wpgraphql"
import { Hero } from "./components/home/Hero"
import { HomeDocument } from "@/graphql/generated/graphql"
import Features from "./components/home/Features"
import Reviews from "./components/home/Reviews/Reviews"

const Home = async () => {
    const data = await wordpressClient.request(HomeDocument)

    return (
        <main>
            <Hero data={data.page?.homePage?.hero} />
            <Features data={data.page?.homePage?.features} />
            <Reviews data={data.page?.homePage?.reviews} />
        </main>
    )
}

export default Home
