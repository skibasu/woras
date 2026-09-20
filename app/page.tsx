import { HOME_QUERY } from "@/lib/queries"
import { wordpressClient } from "@/lib/wpgraphql"

const Home = async () => {
    const data = await wordpressClient.request(HOME_QUERY)

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div>
                    <h1>{data.page.title}</h1>

                    <h2>{data.page.homePage.hero.slogan}</h2>

                    <a href={data.page.homePage.hero.buttonUrl}>{data.page.homePage.hero.buttonText}</a>
                </div>
            </main>
        </div>
    )
}
export default Home
