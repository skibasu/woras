import { ContactDocument } from "@/graphql/generated/graphql"
import { wordpressClient } from "@/lib/wpgraphql"
import { ContactFormProvider } from "@/app/context/ContactFormContext"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import OpeningHours from "./OpeningHours"
import ContactInfo from "./ContactInfo"
import WhatsApp from "./Whatsapp"
import Image from "next/image"
import ContactFormResultView from "./ContactFormResultView/ContactFormResultView"
import ProgressiveImage from "../../ui/ProgressiveImage/ProgressiveImage"

const Contact = async () => {
    const data = await wordpressClient.request(ContactDocument)

    return (
        <ContactFormProvider>
            <section id="contact" className="page-section section-y-spacing relative overflow-hidden">
                <ProgressiveImage src="images/picture-kontakt.png" alt="background" className="object-cover w-full h-full" fill={true} containerClassName="absolute inset-0 z-0 w-full h-full" onLoadOpacity={0.15} />

                <div className="main-container relative">
                    <SectionTitle className="mb-10 lg:mb-16" title={data?.page?.contactPage?.title} titleAccent={data?.page?.contactPage?.titleAccent} accentEnd={data?.page?.contactPage?.accentEnd} eyebrow={data?.page?.contactPage?.eyebrow} subtitle={data?.page?.contactPage?.subtitle} />

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 mb-20">
                        <div className="cart bg-white p-6 lg:p-8 xl:col-span-2 xl:order-2 relative overflow-hidden">
                            <ContactFormResultView />
                        </div>

                        <div className="cart p-6 lg:p-8 xl:col-span-1 xl:order-1">
                            <ContactInfo companyName={data?.page?.contactPage?.companyName ?? null} phone={data?.page?.contactPage?.phone ?? null} email={data?.page?.contactPage?.email ?? null} />
                            <div className="my-8 h-px w-full bg-black/10" />
                            <OpeningHours items={data?.page?.contactPage?.openingHours} />
                        </div>
                    </div>
                    <WhatsApp url="#" eyebrow={data?.page?.contactPage?.whatsupEyeBrow ?? null} subtitle={data?.page?.contactPage?.whatsappSubtitle ?? null} />
                </div>
            </section>
        </ContactFormProvider>
    )
}

export default Contact
