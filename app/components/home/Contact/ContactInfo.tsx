import type { ContactQuery } from "@/graphql/generated/graphql"
import EmailIcon from "@/app/components/ui/IconsSvg/EmailIcon"
import PhoneIcon from "@/app/components/ui/IconsSvg/PhoneIcon"

type ContactPageData = NonNullable<NonNullable<ContactQuery["page"]>["contactPage"]>

type Props = {
    companyName: ContactPageData["companyName"]
    phone: ContactPageData["phone"]
    email: ContactPageData["email"]
}

const ContactInfo = ({ companyName, phone, email }: Props) => {
    return (
        <div>
            <h3 className="mb-8">{companyName}</h3>

            <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                    <a href={`tel:${phone?.replaceAll(" ", "")}`} className="flex items-center gap-3">
                        <div className="h-5 text-primary">
                            <PhoneIcon className="block h-full w-auto text-current" aria-hidden="true" />
                        </div>
                        <p>{phone}</p>
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-5 text-primary">
                        <EmailIcon className="block h-full w-auto text-current" aria-hidden="true" />
                    </div>
                    <p>{email}</p>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo
