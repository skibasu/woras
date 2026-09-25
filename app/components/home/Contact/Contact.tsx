import { ContactDocument } from "@/graphql/generated/graphql"
import { wordpressClient } from "@/lib/wpgraphql"
import { ContactFormProvider } from "@/app/context/ContactFormContext"
import SectionTitle from "../../ui/SectionTitle/SectionTitle"
import OpeningHours from "./OpeningHours"
import ContactInfo from "./ContactInfo"
import WhatsApp from "./Whatsapp"
import Image from "next/image"
import Tabs from "./Tabs/Tabs"

const Contact = async () => {
    const data = await wordpressClient.request(ContactDocument)

    return (
        <ContactFormProvider>
            <section className="section-y-spacing relative overflow-hidden">
                <div className="lg:block absolute  right-0 top-0 z-0  w-full h-full ">
                    <Image className="opacity-15" src="images/picture-kontakt.png" style={{ objectFit: "cover" }} alt="" fill />
                </div>
                <div className="hidden  absolute left-0 bottom-0 z-0 translate-x-[-30%] translate-y-[20%] w-[630px] h-[630px]">
                    <Image className="opacity-7" src="images/background-contact.svg" alt="" fill />
                </div>
                <div className="hidden absolute translate-x-1/3 right-0 top-[-70px] z-0  w-[787px] h-[907px]">
                    <Image className="opacity-7" src="images/background-bike.svg" alt="" fill />
                </div>
                <div className="main-container relative">
                    <SectionTitle className="mb-10 lg:mb-16" title={data?.page?.contactPage?.title} titleAccent={data?.page?.contactPage?.titleAccent} accentEnd={data?.page?.contactPage?.accentEnd} eyebrow={data?.page?.contactPage?.eyebrow} subtitle={data?.page?.contactPage?.subtitle} />

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-20">
                        <div className="cart bg-white p-6 lg:p-8 lg:col-span-2 lg:order-2 relative overflow-hidden">
                            <Tabs />
                        </div>

                        <div className="cart p-6 lg:p-8 lg:col-span-1 lg:order-1">
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
