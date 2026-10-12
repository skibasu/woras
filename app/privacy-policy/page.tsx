import { PrivacyPolicyDocument } from "@/graphql/generated/graphql"
import { wordpressClient } from "@/lib/wpgraphql"
import { main } from "motion/react-client"

async function getPrivacyPolicyData() {
    return wordpressClient.request(PrivacyPolicyDocument)
}

const PrivacyPolicyPage = async () => {
    const data = await getPrivacyPolicyData()
    return (
        <main className="privacy-policy-page">
            <section id="privacy-policy" className="page-section section-y-spacing relative overflow-hidden">
                <div className="main-container-sm relative z-30">
                    <article>
                        <h1>{data.page?.title}</h1>
                        <p>
                            <strong>Last updated:</strong> {data?.page?.modified ? new Date(data?.page?.modified).toLocaleDateString() : "Unknown"}
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: data.page?.privacyPolicy?.pageContent || "" }}></div>
                    </article>
                </div>
            </section>
        </main>
    )
}

export default PrivacyPolicyPage
