import EmailIcon from "@/app/components/ui/IconsSvg/EmailIcon"
import PhoneIcon from "@/app/components/ui/IconsSvg/PhoneIcon"
import { getGeneralSettings } from "@/lib/getGeneralSettings"

const ContactInfo = async () => {
    const data = await getGeneralSettings()
    const { companyName, phoneNumber, companyEmail } = data || {}
    return (
        <div>
            <h3 className="mb-8">{companyName}</h3>

            <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                    <a href={`tel:${phoneNumber?.replaceAll(" ", "")}`} className="flex items-center gap-3">
                        <div className="h-5 text-primary">
                            <PhoneIcon className="block h-full w-auto text-current" aria-hidden="true" />
                        </div>
                        <p>{phoneNumber}</p>
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-5 text-primary">
                        <EmailIcon className="block h-full w-auto text-current" aria-hidden="true" />
                    </div>
                    <p>{companyEmail}</p>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo
