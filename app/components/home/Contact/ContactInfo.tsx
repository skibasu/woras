import EmailIcon from "@/app/components/ui/IconsSvg/EmailIcon"
import PhoneIcon from "@/app/components/ui/IconsSvg/PhoneIcon"

type Props = {
    companyName: string | null
    phoneNumber: string | null
    companyEmail: string | null
}

const ContactInfo = ({ companyName, phoneNumber, companyEmail }: Props) => {
    return (
        <div>
            <h3 className="mb-8">{companyName}</h3>

            <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                    <a href={`tel:${phoneNumber?.replaceAll(" ", "")}`} className="flex items-center gap-3">
                        <div className="h-5 ">
                            <PhoneIcon className="block h-full w-auto text-accent " aria-hidden="true" />
                        </div>
                        <p>{phoneNumber}</p>
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-5 text-primary">
                        <EmailIcon className="block h-full w-auto text-accent " aria-hidden="true" />
                    </div>
                    <p>{companyEmail}</p>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo
